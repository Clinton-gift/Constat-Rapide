import React from "react";
import { View, StyleSheet } from "react-native";
import ReviewRow from "./ReviewRow";

export default function ReviewList({ items, onRetakePress }) {
  return (
    <View style={styles.card}>
      {items.map((item, index) => (
        <ReviewRow
          key={item.id}
          item={item}
          onRetakePress={onRetakePress}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F0EEF7",
    borderRadius: 22,
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "#E6E3F0",
  },
});