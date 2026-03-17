import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

import Header from "../components/VerifyChoicesComponents/Header";
import Body from "../components/VerifyChoicesComponents/Body";

export default function VerifyChoicesScreen({ navigation, route }) {
  const selectedVehicle = route?.params?.selectedVehicle || "your_vehicle";
  const selectionsByStep = route?.params?.selectionsByStep || {};
  const selectedLabels = route?.params?.selectedLabels || [];
  const yourVehicleImage = route?.params?.yourVehicleImage || null;
  const otherVehicleImage = route?.params?.otherVehicleImage || null;

  const [choices, setChoices] = useState(selectedLabels);

  const screenSubtitle = useMemo(() => {
    return selectedVehicle === "other_vehicle"
      ? "Confirmez les circonstances sélectionnées pour l’autre véhicule."
      : "Confirmez les circonstances sélectionnées pour votre véhicule.";
  }, [selectedVehicle]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDelete = (itemId) => {
    setChoices((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handlePrimaryPress = () => {
    navigation.navigate("DescribeAccidentScreen", {
      selectedVehicle,
      selectionsByStep,
      selectedLabels: choices,
      yourVehicleImage,
      otherVehicleImage,
    });
  };

  const handleSecondaryPress = () => {
    navigation.navigate("CirconstancesFormScreen", {
      selectedVehicle,
      yourVehicleImage,
      otherVehicleImage,
      restoreStep: 1,
      restoreSelections: selectionsByStep,
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
            <Header
              onBackPress={handleBackPress}
              subtitle={screenSubtitle}
            />

            <Body
              items={choices}
              onDeletePress={handleDelete}
              onPrimaryPress={handlePrimaryPress}
              onSecondaryPress={handleSecondaryPress}
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