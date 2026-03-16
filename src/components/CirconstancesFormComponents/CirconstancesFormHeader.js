import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CirconstancesFormHeader({ onBackPress }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBackPress}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Circonstances</Text>

        <View style={styles.rightSpacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 6,
    paddingBottom: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 36,
    lineHeight: 36,
    color: "#336DB4",
    fontWeight: "400",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    color: "#151515",
    fontSize: 24,
  },
  rightSpacer: {
    width: 36,
  },
});