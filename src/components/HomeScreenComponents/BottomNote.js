import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

export default function BottomNote() {
  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  return (
    <View style={styles.wrapper}>
      <Text
        style={[
          styles.text,
          { fontSize: isSmall ? 14 : 16, lineHeight: isSmall ? 20 : 24 },
        ]}
      >
        Cela ne prendra que quelques minutes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  text: {
    color: "#4A4A57",
    textAlign: "center",
  },
});