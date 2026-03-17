import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Header({ onBackPress }) {
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

        <Text style={styles.topTitle}>Inviter l’autre conducteur</Text>

        <View style={styles.rightSpacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 4,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 34,
    lineHeight: 34,
    color: "#4F5F7A",
    fontWeight: "400",
  },
  topTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "500",
    color: "#1E1E24",
  },
  rightSpacer: {
    width: 36,
  },
});