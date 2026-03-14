import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BottomButton({ disabled, onPress }) {
  if (disabled) {
    return (
      <View style={styles.buttonWrapper}>
        <View style={[styles.button, styles.disabledButton]}>
          <Text style={[styles.buttonText, styles.disabledButtonText]}>
            Continuer
          </Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.buttonWrapper}
    >
      <LinearGradient
        colors={["#3E74CC", "#6FA4F0"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Continuer</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingTop: 10,
  },
  button: {
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#E5E8F1",
    borderWidth: 1,
    borderColor: "#D7DBE7",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  disabledButtonText: {
    color: "#91A0B7",
  },
});