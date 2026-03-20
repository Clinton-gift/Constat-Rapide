import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Body({ onStartProcessPress }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.imagePlaceholder}>
          
          <Image
            source={require("../../../assets/screen2.png")}
            style={styles.cardImage}
            resizeMode="cover"
          />
        
        </View>

        <Text style={styles.heading}>
          Ne déplacez pas encore{"\n"}les véhicules
        </Text>

        <Text style={styles.description}>
          Pour faciliter la gestion de votre sinistre, suivez les étapes
          suivantes avant toute chose.
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onStartProcessPress}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={["#4568E6", "#6F86FF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}
          >
            <Text style={styles.buttonArrow}>→</Text>
            <Text style={styles.buttonText}>Commencer le processus</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.dotsRow}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
  },
  card: {
    width: "100%",
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderWidth: 1,
    borderColor: "#E7DDF8",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 22,
    marginTop: 8,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
    color: "#2B2B3B",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 14,
  },
  description: {
    fontSize: 14,
    lineHeight: 28,
    color: "#5A5A70",
    textAlign: "center",
    fontWeight: "400",
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  buttonWrapper: {
    width: "100%",
  },
  button: {
    height: 50,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "500",
    marginRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
    textAlign: "center",
  },
 
});