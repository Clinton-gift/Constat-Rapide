import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Linking,
} from "react-native";

import Header from "../components/InviteOtherDriverComponents/Header";
import Body from "../components/InviteOtherDriverComponents/Body";

export default function InviteOtherDriverScreen({ navigation, route }) {
  const sessionId = route?.params?.sessionId || `acc_${Date.now()}`;
  const selectedVehicle = route?.params?.selectedVehicle || null;
  const selectionsByStep = route?.params?.selectionsByStep || {};
  const selectedLabels = route?.params?.selectedLabels || [];
  const yourVehicleImage = route?.params?.yourVehicleImage || null;
  const otherVehicleImage = route?.params?.otherVehicleImage || null;
  const accidentDescriptionMethod = route?.params?.accidentDescriptionMethod || null;
  const accidentVoiceUri = route?.params?.accidentVoiceUri || null;
  const accidentText = route?.params?.accidentText || "";

  const inviteLink = `https://constat-rapide.app/join/${sessionId}`;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleWhatsAppPress = async () => {
    try {
      const message =
        `Bonjour, veuillez rejoindre ce constat d'accident en utilisant ce lien : ${inviteLink}`;

      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
      const canOpen = await Linking.canOpenURL(whatsappUrl);

      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(
          "WhatsApp indisponible",
          "WhatsApp n’est pas installé sur cet appareil."
        );
      }
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible d’ouvrir WhatsApp pour le moment."
      );
    }
  };

  const handleContinueWithoutOtherDriver = () => {
    navigation.navigate("NextScreenAfterInviteOtherDriver", {
      sessionId,
      selectedVehicle,
      selectionsByStep,
      selectedLabels,
      yourVehicleImage,
      otherVehicleImage,
      accidentDescriptionMethod,
      accidentVoiceUri,
      accidentText,
      inviteLink,
      invitationSkipped: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F1FF" />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.contentInner}>
            <Header onBackPress={handleBackPress} />

            <Body
              qrValue={inviteLink}
              onWhatsAppPress={handleWhatsAppPress}
              onContinueWithoutOtherDriver={handleContinueWithoutOtherDriver}
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
    backgroundColor: "#F6F1FF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F6F1FF",
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