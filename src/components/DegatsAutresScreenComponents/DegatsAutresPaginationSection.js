import React from "react";
import { View, StyleSheet } from "react-native";

export default function DegatsAutresPaginationSection({
  activeIndex = 1,
  total = 4,
}) {
  return (
    <View style={styles.wrapper}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <View
            key={index}
            style={[
              styles.dot,
              isActive ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 26,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },

  activeDot: {
    backgroundColor: "#B8AED8",
  },

  inactiveDot: {
    backgroundColor: "#DDD5F1",
  },
});