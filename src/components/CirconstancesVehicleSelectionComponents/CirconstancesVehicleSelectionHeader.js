import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default function CirconstancesVehicleSelectionHeader({ onBackPress }) {
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
            styles.title,
            {
              fontSize: isMobile ? 24 : 30,
              lineHeight: isMobile ? 30 : 38,
            },
          ]}
        >
          Circonstances
        </Text>

        <View style={styles.rightSpacer} />
      </View>

      <Text
        style={[
          styles.subtitle,
          {
            fontSize: isMobile ? 16 : 18,
            lineHeight: isMobile ? 24 : 28,
          },
        ]}
      >
        Quel véhicule souhaitez-vous décrire?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 6,
    paddingBottom: 18,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
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
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    color: "#151515",
  },
  rightSpacer: {
    width: 36,
  },
  subtitle: {
    textAlign: "center",
    color: "#353535",
    fontWeight: "400",
  },
});