import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

const cameraicone = require("../../../assets/icons/cameraicone.png");

export default function VuedensembleCaptureActions({
  hasCaptured,
  onCapturePress,
  onContinuePress,
  feedbackType,
  feedbackMessage,
  cameraOpen,
  onSwitchCamera,
}) {
  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  const captureButtonSize = isSmall ? 76 : 84;
  const continueWidth = isSmall ? 128 : 140;
  const continueHeight = isSmall ? 42 : 46;
  const switchWidth = isSmall ? 108 : 118;
  const switchHeight = isSmall ? 38 : 42;

  return (
    <View style={styles.wrapper}>
      {!!feedbackMessage && !cameraOpen && (
        <Text
          style={[
            styles.feedbackText,
            feedbackType === "good" && styles.goodText,
            feedbackType === "bad" && styles.badText,
          ]}
        >
          {feedbackMessage}
        </Text>
      )}

      {cameraOpen && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onSwitchCamera}
          style={[
            styles.switchButton,
            {
              width: switchWidth,
              height: switchHeight,
              borderRadius: 12,
            },
          ]}
        >
          <Text style={styles.switchText}>Switch camera</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onCapturePress}
        style={[
          styles.captureButton,
          {
            width: captureButtonSize,
            height: captureButtonSize,
            borderRadius: captureButtonSize / 2,
          },
        ]}
      >
        <Image
          source={cameraicone}
          style={styles.captureIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={hasCaptured ? 0.9 : 1}
        onPress={onContinuePress}
        disabled={!hasCaptured}
        style={[
          styles.continueButton,
          hasCaptured ? styles.continueButtonActive : styles.continueButtonDisabled,
          {
            width: continueWidth,
            height: continueHeight,
          },
        ]}
      >
        <Text
          style={[
            styles.continueText,
            hasCaptured ? styles.continueTextActive : styles.continueTextDisabled,
            { fontSize: isSmall ? 15 : 16 },
          ]}
        >
          Continuer
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  feedbackText: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  goodText: {
    color: "#1D9D57",
  },

  badText: {
    color: "#D63C3C",
  },

  switchButton: {
    position: "absolute",
    left: 24,
    bottom: 20,
    backgroundColor: "#2E63D8",
    borderWidth: 1,
    borderColor: "#2E63D8",
    alignItems: "center",
    justifyContent: "center",
  },

  switchText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },

  captureButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  captureIcon: {
    width: "88%",
    height: "88%",
  },

  continueButton: {
    position: "absolute",
    left: "50%",
    marginLeft: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  continueButtonDisabled: {
    backgroundColor: "#F2F2F6",
    borderColor: "rgba(90,90,110,0.08)",
  },

  continueButtonActive: {
    backgroundColor: "#2E63D8",
    borderColor: "#2E63D8",
  },

  continueText: {
    fontWeight: "500",
  },

  continueTextDisabled: {
    color: "#8A8A97",
  },

  continueTextActive: {
    color: "#FFFFFF",
  },
});