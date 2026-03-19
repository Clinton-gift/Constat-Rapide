import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Body({ onContinuePress, onReturnPress }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topContent}>
        <Text style={styles.heading}>Votre véhicule est terminé</Text>

        <Text style={styles.subHeading}>
          Passons maintenant à l'autre véhicule
        </Text>

        <Text style={styles.description}>
          Nous allons décrire les circonstances de l'autre véhicule de la même
          façon.
        </Text>
      </View>

      <View style={styles.bottomContent}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onContinuePress}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={["#4568E6", "#6F86FF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continuer</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onReturnPress}
          style={styles.returnButton}
        >
          <Text style={styles.returnText}>Retour aux circonstances</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 56,
    paddingBottom: 46,
  },
  topContent: {
    width: "100%",
    paddingHorizontal: 6,
  },
  heading: {
    fontSize: 21,
    lineHeight: 28,
    color: "#242433",
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    lineHeight: 26,
    color: "#3F4257",
    fontWeight: "400",
    marginBottom: 26,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    lineHeight: 30,
    color: "#6A6C80",
    fontWeight: "400",
    width: "92%",
  },
  bottomContent: {
    width: "100%",
  },
  buttonWrapper: {
    width: "100%",
  },
  button: {
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
  },
  returnButton: {
    marginTop: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  returnText: {
    fontSize: 16,
    lineHeight: 20,
    color: "#4D66B3",
    fontWeight: "400",
    textAlign: "center",
  },
});