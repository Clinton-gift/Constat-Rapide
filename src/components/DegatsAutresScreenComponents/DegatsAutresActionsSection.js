import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function DegatsAutresActionsSection({
  selectedOption,
  onPressOui,
  onPressNon,
}) {
  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  const buttonWidth = isSmall ? 126 : 138;
  const buttonHeight = isSmall ? 54 : 58;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressOui}
        style={[
          styles.button,
          {
            width: buttonWidth,
            height: buttonHeight,
          },
          selectedOption === "oui" ? styles.activeButton : styles.inactiveButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            selectedOption === "oui" ? styles.activeText : styles.inactiveText,
          ]}
        >
          Oui
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressNon}
        style={[
          styles.button,
          {
            width: buttonWidth,
            height: buttonHeight,
          },
          selectedOption === "non" ? styles.activeButton : styles.inactiveButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            selectedOption === "non" ? styles.activeText : styles.inactiveText,
          ]}
        >
          Non
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 16,
    marginTop: 4,
  },

  button: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  activeButton: {
    backgroundColor: "#3F6FE5",
  },

  inactiveButton: {
    backgroundColor: "#FBF9FF",
  },

  buttonText: {
    fontSize: 24,
    fontWeight: "500",
  },

  activeText: {
    color: "#FFFFFF",
  },

  inactiveText: {
    color: "#1E1830",
  },
});