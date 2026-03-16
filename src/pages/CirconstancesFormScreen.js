import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

import CirconstancesFormHeader from "../components/CirconstancesFormComponents/CirconstancesFormHeader";
import CirconstancesProgress from "../components/CirconstancesFormComponents/CirconstancesProgress";
import OptionsList from "../components/CirconstancesFormComponents/OptionsList";
import BottomButton from "../components/CirconstancesFormComponents/BottomButton";

const STEP_OPTIONS = {
  1: [
    {
      id: "s1_1",
      label: "Sortait d’un parking / lieu privé",
      icon: require("../../assets/icons/car2.png"),
      iconWidth: 43,
      iconHeight: 43,
    },
    {
      id: "s1_2",
      label: "S'engageait dans un parking / lieu privé",
      icon: require("../../assets/icons/cararrow.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s1_3",
      label: "Venait de droite",
      icon: require("../../assets/icons/cararrow.png"),
      iconWidth: 43,
      iconHeight: 43,
    },
    {
      id: "s1_4",
      label: "N’avait pas observé la priorité",
      icon: require("../../assets/icons/warning.png"),
      iconWidth: 40,
      iconHeight: 40,
    },
  ],

  2: [
    {
      id: "s2_1",
      label: "En stationnement / à l'arrêt",
      icon: require("../../assets/icons/car2.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s2_2",
      label: "Quittait un stationnement",
      icon: require("../../assets/icons/cararrow1.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s2_3",
      label: "Prenait un stationnement",
      icon: require("../../assets/icons/carbox.png"),
      iconWidth: 39,
      iconHeight: 39,
    },
    {
      id: "s2_4",
      label: "Doublait",
      icon: require("../../assets/icons/cararrow.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s2_5",
      label: "Reculait",
      icon: require("../../assets/icons/carcar.webp"),
      iconWidth: 39,
      iconHeight: 39,
    },
  ],

  3: [
    {
      id: "s3_1",
      label: "Changeait de file",
      icon: require("../../assets/icons/car2.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s3_2",
      label: "Doublait",
      icon: require("../../assets/icons/cararrow1.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s3_3",
      label: "Virait à droite",
      icon: require("../../assets/icons/cararrow.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s3_4",
      label: "Virait à gauche",
      icon: require("../../assets/icons/cararrow.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
  ],

  4: [
    {
      id: "s4_1",
      label: "Heurtait l’arrière d’un autre véhicule",
      icon: require("../../assets/icons/car2.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s4_2",
      label: "Heurtait l’arrière d’un véhicule en stationnement.",
      icon: require("../../assets/icons/carobstacle.webp"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s4_3",
      label: "Perdait de la marchandise",
      icon: require("../../assets/icons/cargas.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s4_4",
      label: "Heurtait un piéton",
      icon: require("../../assets/icons/person.png"),
      iconWidth: 44,
      iconHeight: 44,
    },
    {
      id: "s4_5",
      label: "Heurtait un obstacle",
      icon: require("../../assets/icons/carobstacle.webp"),
      iconWidth: 44,
      iconHeight: 44,
    },
  ],
};

export default function CirconstancesFormScreen({ navigation, route }) {
  const totalSteps = 4;

  const selectedVehicle = route?.params?.selectedVehicle || null;
  const yourVehicleImage = route?.params?.yourVehicleImage || null;
  const otherVehicleImage = route?.params?.otherVehicleImage || null;
  const restoreStep = route?.params?.restoreStep || 1;
  const restoreSelections = route?.params?.restoreSelections || {};

  const [currentStep, setCurrentStep] = useState(restoreStep);
  const [selectedByStep, setSelectedByStep] = useState(restoreSelections);

  const currentOptions = useMemo(() => {
    return STEP_OPTIONS[currentStep] || [];
  }, [currentStep]);

  const handleBackPress = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      return;
    }
    navigation.goBack();
  };

  const handleSelectOption = (optionId) => {
    setSelectedByStep((prev) => ({
      ...prev,
      [currentStep]: optionId,
    }));
  };

  const handleSelectNone = () => {
    setSelectedByStep((prev) => ({
      ...prev,
      [currentStep]: "none",
    }));
  };

 const handleContinue = () => {
  if (!selectedByStep[currentStep]) return;

  if (currentStep < totalSteps) {
    setCurrentStep((prev) => prev + 1);
    return;
  }

  const selectedLabels = Object.entries(selectedByStep)
    .map(([stepKey, selectedId]) => {
      if (selectedId === "none") {
        return null;
      }

      const stepOptions = STEP_OPTIONS[stepKey] || [];
      const selectedOption = stepOptions.find((option) => option.id === selectedId);

      if (!selectedOption) return null;

      return {
        id: selectedOption.id,
        label: selectedOption.label,
        icon: selectedOption.icon,
      };
    })
    .filter(Boolean);

  navigation.navigate("VerifyChoicesScreen", {
    selectedVehicle,
    selectionsByStep: selectedByStep,
    selectedLabels,
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
            <CirconstancesFormHeader onBackPress={handleBackPress} />

            <CirconstancesProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
            />

            <OptionsList
              options={currentOptions}
              selectedValue={selectedByStep[currentStep]}
              onSelectOption={handleSelectOption}
              onSelectNone={handleSelectNone}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <BottomButton
            disabled={!selectedByStep[currentStep]}
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
    paddingBottom: 28,
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