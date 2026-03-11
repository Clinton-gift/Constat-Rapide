import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default function InjuryQuestionCard({
  onInjuredPress,
  onNoInjuredPress,
}) {
  const { width } = useWindowDimensions();

  const isSmall = width < 380;
  const cardRadius = isSmall ? 24 : 28;
  const buttonHeight = isSmall ? 58 : 62;
  const iconSize = isSmall ? 36 : 38;
  const textSize = isSmall ? 14 : 16;
  const arrowSize = isSmall ? 24 : 28;

  return (
    <View style={[styles.card, { borderRadius: cardRadius }]}>
      <Text
        style={[
          styles.cardTitle,
          { fontSize: isSmall ? 18 : 20, lineHeight: isSmall ? 24 : 28 },
        ]}
      >
        Y a-t-il un blessé ?
      </Text>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.button, styles.redButton, { height: buttonHeight }]}
        onPress={onInjuredPress}
      >
        <View
          style={[
            styles.iconCircle,
            {
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
            },
          ]}
        >
          <Text style={[styles.redIcon, { fontSize: isSmall ? 17 : 19 }]}>✚</Text>
        </View>

        <Text
          style={[
            styles.buttonText,
            { fontSize: textSize, lineHeight: isSmall ? 18 : 20 },
          ]}
        >
          Oui, quelqu’un est blessé
        </Text>

        <Text style={[styles.arrow, { fontSize: arrowSize, lineHeight: arrowSize }]}>
          ›
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.button, styles.blueButton, { height: buttonHeight }]}
        onPress={onNoInjuredPress}
      >
        <View
          style={[
            styles.iconCircle,
            {
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
            },
          ]}
        >
          <Text style={[styles.greenIcon, { fontSize: isSmall ? 20 : 22 }]}>✓</Text>
        </View>

        <Text
          style={[
            styles.buttonText,
            { fontSize: textSize, lineHeight: isSmall ? 18 : 20 },
          ]}
        >
          Non, personne n’est blessé
        </Text>

        <Text style={[styles.arrow, { fontSize: arrowSize, lineHeight: arrowSize }]}>
          ›
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  cardTitle: {
    textAlign: "center",
    fontWeight: "600",
    color: "#1B1B24",
    marginBottom: 18,
  },

  button: {
    width: "100%",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  redButton: {
    backgroundColor: "#EF4B43",
    marginBottom: 14,
  },

  blueButton: {
    backgroundColor: "#2E63D8",
  },

  iconCircle: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    flexShrink: 0,
  },

  redIcon: {
    fontWeight: "700",
    color: "#E24A42",
  },

  greenIcon: {
    fontWeight: "700",
    color: "#6AA46A",
  },

  buttonText: {
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "600",
    paddingRight: 8,
  },

  arrow: {
    color: "#FFFFFF",
    marginLeft: 6,
    flexShrink: 0,
  },
});