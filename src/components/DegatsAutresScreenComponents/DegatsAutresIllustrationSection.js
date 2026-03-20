import React from "react";
import { View, Image, StyleSheet, useWindowDimensions } from "react-native";

export default function DegatsAutresIllustrationSection({ imageSource }) {
  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  const imageWidth = isSmall ? width - 90 : width - 72;
  const imageHeight = imageWidth * 0.62;

  return (
    <View style={styles.wrapper}>
      <Image
        source={imageSource}
        resizeMode="contain"
        style={[
          styles.image,
          {
            width: imageWidth,
            height: imageHeight,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },

  image: {
    alignSelf: "center",
  },
});