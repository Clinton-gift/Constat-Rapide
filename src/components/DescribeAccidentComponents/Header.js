import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default function Header({ onBackPress }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBackPress}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.topTitle,
            {
              fontSize: isMobile ? 26 : 32,
              lineHeight: isMobile ? 32 : 40,
            },
          ]}
        >
          Décrivez l’accident
        </Text>

        <View style={styles.rightSpacer} />
      </View>

      <Text
        style={[
          styles.mainTitle,
          {
            fontSize: isMobile ? 22 : 28,
            lineHeight: isMobile ? 28 : 26,
          },
        ]}
      >
        Décrivez l’accident
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            fontSize: isMobile ? 16 : 18,
            lineHeight: isMobile ? 24 : 28,
          },
        ]}
      >
        Expliquez en quelques mots ce qu’il s’est passé.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 6,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 36,
    lineHeight: 36,
    color: "#336DB4",
    fontWeight: "400",
  },
  topTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    color: "#151515",
  },
  rightSpacer: {
    width: 36,
  },
  mainTitle: {
    color: "#151515",
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#52525D",
    fontWeight: "400",
    textAlign: "center",
  },
});