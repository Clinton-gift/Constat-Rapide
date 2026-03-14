import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CirconstancesProgress({ currentStep, totalSteps }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.progressRow}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;

          if (isActive) {
            return (
              <View key={stepNumber} style={styles.activePill}>
                <Text style={styles.activePillText}>
                  {currentStep} sur {totalSteps}
                </Text>
              </View>
            );
          }

          return <View key={stepNumber} style={styles.line} />;
        })}
      </View>

      <Text style={styles.instructionTitle}>
        Sélectionnez ce qui correspond le mieux.
      </Text>

      <Text style={styles.instructionSubtitle}>
        correspond, choisissez “Aucune de ces circonstances.”
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 6,
    paddingBottom: 14,
    alignItems: "center",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    gap: 8,
  },
  activePill: {
    backgroundColor: "#4B8FE8",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  activePillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  line: {
    width: 28,
    height: 2,
    borderRadius: 10,
    backgroundColor: "#C9D8F4",
  },
  instructionTitle: {
    textAlign: "center",
    color: "#353535",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  instructionSubtitle: {
    textAlign: "center",
    color: "#5D5D69",
    fontSize: 13,
  },
});