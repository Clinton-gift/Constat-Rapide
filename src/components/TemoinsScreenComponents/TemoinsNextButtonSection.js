import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function TemoinsNextButtonSection({ onPress }) {
  const { width } = useWindowDimensions();
  const buttonWidth = width < 380 ? width - 44 : width - 52;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.button, { width: buttonWidth }]}
    >
      <Text style={styles.buttonText}>Suivant</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    height: 54,
    borderRadius: 16,
    backgroundColor: "#4C6FFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
});