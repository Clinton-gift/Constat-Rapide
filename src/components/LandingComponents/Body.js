import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Body({ onStartPress }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topContent}>
        <View style={styles.logoSection}>
          <View style={styles.logoPlaceholder}>
            <Image
              source={require("../../../assets/constatraoidelogo.webp")}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>CONSTAT AMIABLE</Text>
          <Text style={styles.subTitle}>D’ACCIDENT AUTOMOBILE</Text>
        </View>

        <View style={styles.illustrationSection}>
          <View style={styles.heroPlaceholder}>
            <Image
              source={require("../../../assets/screen1.webp")}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
        </View>
<Text style={styles.description}>
  Ne constitue pas une{" "}
  <Text style={styles.boldText}>reconnaissance</Text>
  {" "}de responsabilité mais un relevé des faits et des coordonnées servant à
  l’appréciation des responsabilités et de l’accélération du règlement des indemnités.
</Text>
        
      </View>

      <View style={styles.bottomContent}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onStartPress}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={["#4568E6", "#6F86FF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}
          >
            <Text style={styles.buttonArrow}>→</Text>
            <Text style={styles.buttonText}>Commencer</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 4,
  },
  topContent: {
    width: "100%",
    alignItems: "center",
  },
  bottomContent: {
    width: "100%",
    marginTop: 16,
  },
  logoSection: {
    alignItems: "center",
    marginTop: 4,
  },
  logoPlaceholder: {
    width: 170,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  titleSection: {
    alignItems: "center",
    marginTop: 2,
  },
  mainTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: "#27306D",
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 15,
    lineHeight: 20,
    color: "#4A4C73",
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 0.4,
    marginTop: 0,
  },
  illustrationSection: {
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  heroPlaceholder: {
    width: "100%",
    maxWidth: 320,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  description: {
    width: "88%",
    fontSize: 15,
    lineHeight: 21,
    color: "#53536A",
    textAlign: "left",
    fontWeight: "400",
    marginTop: 4,
  },
  boldText: {
  fontWeight: "700",
},
  buttonWrapper: {
    width: "100%",
    paddingHorizontal: 18,
  },
  button: {
    height: 50,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 22,
    fontWeight: "500",
    marginRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 21,
    lineHeight: 24,
    fontWeight: "600",
  },
  
});