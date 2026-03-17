import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Audio } from "expo-av";

import Header from "../components/DescribeAccidentComponents/Header";
import Body from "../components/DescribeAccidentComponents/Body";

export default function DescribeAccidentScreen({ navigation, route }) {
  const selectedVehicle = route?.params?.selectedVehicle || null;
  const selectionsByStep = route?.params?.selectionsByStep || {};
  const selectedLabels = route?.params?.selectedLabels || [];
  const yourVehicleImage = route?.params?.yourVehicleImage || null;
  const otherVehicleImage = route?.params?.otherVehicleImage || null;

  const [selectedMethod, setSelectedMethod] = useState(null); // "voice" | "text"
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [textModalVisible, setTextModalVisible] = useState(false);

  const [recording, setRecording] = useState(null);
  const [voiceUri, setVoiceUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [accidentText, setAccidentText] = useState("");

  const hasSavedVoice = useMemo(() => !!voiceUri, [voiceUri]);
  const hasSavedText = useMemo(
    () => accidentText.trim().length > 0,
    [accidentText]
  );

  const isContinueDisabled = useMemo(() => {
    if (selectedMethod === "voice") return !hasSavedVoice;
    if (selectedMethod === "text") return !hasSavedText;
    return true;
  }, [selectedMethod, hasSavedVoice, hasSavedText]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleReturnPress = () => {
    navigation.goBack();
  };

  const handleSelectVoice = () => {
    setSelectedMethod("voice");
    setVoiceModalVisible(true);
  };

  const handleSelectText = () => {
    setSelectedMethod("text");
    setTextModalVisible(true);
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission refusée",
          "L’accès au microphone est nécessaire pour enregistrer un message vocal."
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible de démarrer l’enregistrement vocal."
      );
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      setVoiceUri(uri || null);
      setRecording(null);
      setIsRecording(false);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      Alert.alert("Erreur", "Impossible d’arrêter l’enregistrement.");
    }
  };

  const handleCloseVoiceModal = async () => {
    try {
      if (isRecording && recording) {
        await stopRecording();
      }
    } catch (error) {}

    setVoiceModalVisible(false);
  };

  const handleCloseTextModal = () => {
    setTextModalVisible(false);
  };

  const handleContinue = () => {
    if (isContinueDisabled) return;

    navigation.navigate("InviteOtherDriverScreen", {
      selectedVehicle,
      selectionsByStep,
      selectedLabels,
      yourVehicleImage,
      otherVehicleImage,
      accidentDescriptionMethod: selectedMethod,
      accidentVoiceUri: voiceUri,
      accidentText,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FB" />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.contentInner}>
            <Header onBackPress={handleBackPress} />

            <Body
              selectedMethod={selectedMethod}
              onSelectVoice={handleSelectVoice}
              onSelectText={handleSelectText}
              onContinue={handleContinue}
              onReturn={handleReturnPress}
              continueDisabled={isContinueDisabled}
              voiceModalVisible={voiceModalVisible}
              textModalVisible={textModalVisible}
              onCloseVoiceModal={handleCloseVoiceModal}
              onCloseTextModal={handleCloseTextModal}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              isRecording={isRecording}
              hasSavedVoice={hasSavedVoice}
              accidentText={accidentText}
              onChangeAccidentText={setAccidentText}
              hasSavedText={hasSavedText}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  contentInner: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },
});