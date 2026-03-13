import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

export default function VuedensembleCaptureInstructionCard({
  stepLabel,
  title,
  instruction,
}) {
  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  return (
    <View style={styles.outer}>
      <View style={styles.headerRow}>
        <View style={styles.stepPill}>
          <Text style={[styles.stepText, { fontSize: isSmall ? 13 : 14 }]}>
            {stepLabel}
          </Text>
        </View>

        <Text style={[styles.headerTitle, { fontSize: isSmall ? 17 : 19 }]}>
          {title}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.body}>
        <Text
          style={[
            styles.bodyText,
            {
              fontSize: isSmall ? 16 : 18,
              lineHeight: isSmall ? 22 : 26,
            },
          ]}
        >
          {instruction}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginHorizontal: 18,
    marginTop: 2,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.90)",
    borderWidth: 1,
    borderColor: "rgba(20,33,61,0.05)",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  stepPill: {
    backgroundColor: "#4B8FE8",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 12,
  },

  stepText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  headerTitle: {
    color: "#1D1D27",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(20,33,61,0.06)",
  },

  body: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  bodyText: {
    textAlign: "center",
    color: "#222330",
    fontWeight: "400",
  },
});