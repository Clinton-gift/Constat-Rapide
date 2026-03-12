import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function VehicleTypeContinueButton({ onPress, disabled }) {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.9}
      onPress={disabled ? null : onPress}
      disabled={disabled}
      style={styles.buttonWrapper}
    >
      <LinearGradient
        colors={disabled ? ["#CFCFD4", "#E2E2E6"] : ["#1747B5", "#2898F3"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.button, disabled && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Continuer</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1C63D5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
});