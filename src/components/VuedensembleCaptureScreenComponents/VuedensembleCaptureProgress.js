import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";

export default function VuedensembleCaptureProgress({
  totalSteps = 7,
  currentStep = 1,
}) {
  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  const dotSize = isSmall ? 12 : 13;
  const lineWidth = isSmall ? 14 : 18;

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <View
                style={[
                  styles.dot,
                  isActive ? styles.activeDot : styles.inactiveDot,
                  {
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                  },
                ]}
              />
              {index < totalSteps - 1 && (
                <View style={[styles.line, { width: lineWidth }]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  dot: {},

  activeDot: {
    backgroundColor: "#4B8FE8",
  },

  inactiveDot: {
    backgroundColor: "#EEF2FA",
    borderWidth: 1.5,
    borderColor: "#BFCBDE",
  },

  line: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#CFE0FA",
    marginHorizontal: 4,
  },
});