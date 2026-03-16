import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

import CirconstancesVehicleSelectionHeader from "../components/CirconstancesVehicleSelectionComponents/CirconstancesVehicleSelectionHeader";
import CirconstancesVehicleSelectionCards from "../components/CirconstancesVehicleSelectionComponents/CirconstancesVehicleSelectionCards";
import Button from "../components/CirconstancesVehicleSelectionComponents/Button";

export default function CirconstancesVehicleSelectionScreen({
  navigation,
  route,
}) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const yourVehicleImage = route?.params?.yourVehicleImage || null;
  const otherVehicleImage = route?.params?.otherVehicleImage || null;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (!selectedVehicle) return;

    navigation.navigate("CirconstancesFormScreen", {
      selectedVehicle,
      yourVehicleImage,
      otherVehicleImage,
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
            <CirconstancesVehicleSelectionHeader onBackPress={handleBackPress} />

            <CirconstancesVehicleSelectionCards
              selectedVehicle={selectedVehicle}
              setSelectedVehicle={setSelectedVehicle}
              yourVehicleImage={yourVehicleImage}
              otherVehicleImage={otherVehicleImage}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <Button
            disabled={!selectedVehicle}
            onPress={handleContinue}
          />
        </View>
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
  bottomArea: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    backgroundColor: "#F7F7FB",
  },
});