import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";

import Header from "../components/VehicleCompletedTransitionComponents/Header";
import Body from "../components/VehicleCompletedTransitionComponents/Body";

export default function VehicleCompletedTransitionScreen({ navigation, route }) {
  const sessionId = route?.params?.sessionId || `acc_${Date.now()}`;
  const selectedVehicle = route?.params?.selectedVehicle || null;
  const selectionsByStep = route?.params?.selectionsByStep || {};
  const selectedLabels = route?.params?.selectedLabels || [];
  const yourVehicleImage = route?.params?.yourVehicleImage || null;
  const otherVehicleImage = route?.params?.otherVehicleImage || null;
  const accidentDescriptionMethod =
    route?.params?.accidentDescriptionMethod || null;
  const accidentVoiceUri = route?.params?.accidentVoiceUri || null;
  const accidentText = route?.params?.accidentText || "";

  const handleContinuePress = () => {
    navigation.navigate("InviteOtherDriverScreen", {
      sessionId,
      selectedVehicle,
      selectionsByStep,
      selectedLabels,
      yourVehicleImage,
      otherVehicleImage,
      accidentDescriptionMethod,
      accidentVoiceUri,
      accidentText,
    });
  };

  const handleReturnPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5EEFF" />
      <View style={styles.container}>
        <View style={styles.contentInner}>
          <Header />
          <Body
            onContinuePress={handleContinuePress}
            onReturnPress={handleReturnPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5EEFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5EEFF",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  contentInner: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },
});