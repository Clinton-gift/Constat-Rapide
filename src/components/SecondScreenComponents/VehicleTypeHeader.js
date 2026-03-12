import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";

export default function VehicleTypeHeader() {
  const { width } = useWindowDimensions();

  const isMobile = width < 668;
  const logoWidth = isMobile ? 200 : 200;
  const logoHeight = isMobile ? 120 : 120;
  const titleSize = isMobile ? 20: 32;
  const subtitleSize = isMobile ? 16 : 18;

  return (
    <>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/constatraoidelogo.png")}
          style={{ width: logoWidth, height: logoHeight }}
          resizeMode="contain"
        />
      </View>

      <Text
        style={[
          styles.title,
          {
            fontSize: titleSize,
            lineHeight: isMobile ? 36 : 50,
          },
        ]}
      >
        Quel est votre type de véhicule ?
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            fontSize: subtitleSize,
            lineHeight: isMobile ? 24 : 28,
          },
        ]}
      >
        Choisissez le modèle qui ressemble le plus à{"\n"}
        votre véhicule.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    marginTop: 1,
    marginBottom: 5,
  
  },
  title: {
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#4B4B4B",
    textAlign: "center",
    marginBottom: 28,
  },
});