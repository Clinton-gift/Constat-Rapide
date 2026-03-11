import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";

const logo = require("../../../assets/constatraoidelogo.png");

export default function HomeHeader() {
  const { width } = useWindowDimensions();

  const isSmall = width < 380;
  const logoWidth = Math.min(width * 0.78, 320);
  const logoHeight = logoWidth * 0.42;

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoRow}>
        <Image
          source={logo}
          style={[styles.logo, { width: logoWidth, height: logoHeight }]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textBlock}>
        <Text
          style={[
            styles.title,
            { fontSize: isSmall ? 22 : 24, lineHeight: isSmall ? 28 : 30 },
          ]}
        >
          Avez-vous eu un accident ?
        </Text>

        <Text
          style={[
            styles.subtitle,
            { fontSize: isSmall ? 14 : 15, lineHeight: isSmall ? 20 : 21 },
          ]}
        >
          Commençons par vérifier la sécurité de tous.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingTop: 4,
    marginBottom: 8,
  },

  logoRow: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 4,
  },

  logo: {
    marginLeft: -60,
  },

  textBlock: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  title: {
    width: "100%",
    fontWeight: "600",
    color: "#191A23",
    letterSpacing: -0.3,
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    width: "100%",
    fontWeight: "400",
    color: "#4A4B57",
    textAlign: "center",
  },
});