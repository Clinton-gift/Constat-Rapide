import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default function PhotoReviewHeader({ onBackPress }) {
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
              fontSize: isMobile ? 25 : 32,
              lineHeight: isMobile ? 32 : 40,
            },
          ]}
        >
          Vérifiez vos photos
        </Text>

        <View style={styles.rightSpacer} />
      </View>

      <Text
        style={[
          styles.subtitle,
          {
            fontSize: isMobile ? 16 : 18,
            lineHeight: isMobile ? 25 : 28,
          },
        ]}
      >
        Assurez-vous que toutes les photos sont{"\n"}
        bien visibles avant de continuer.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 6,
    paddingBottom: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
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