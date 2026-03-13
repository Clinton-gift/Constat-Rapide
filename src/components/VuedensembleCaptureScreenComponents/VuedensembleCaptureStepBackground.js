import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

export default function VuedensembleCaptureStepBackground({
  bgImage,
  cameraOpen,
  capturedUri,
  cameraRef,
  permissionGranted,
  CameraViewComponent,
}) {
  const showCamera = cameraOpen && permissionGranted;
  const showCapturedPhoto = !!capturedUri;

  if (showCamera) {
    return (
      <View style={styles.cameraOnlyWrapper}>
        <CameraViewComponent
          ref={cameraRef}
          style={styles.cameraOnlyView}
          facing="back"
        />
      </View>
    );
  }

  if (showCapturedPhoto) {
    return (
      <View style={styles.capturedWrapper}>
        <Image
          source={{ uri: capturedUri }}
          style={styles.capturedImage}
          resizeMode="cover"
        />
      </View>
    );
  }

  if (!bgImage) {
    return (
      <View style={styles.placeholderBg}>
        <Text style={styles.placeholderText}>Image manquante</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Image source={bgImage} style={styles.backgroundImage} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  cameraOnlyWrapper: {
    flex: 1,
    overflow: "hidden",
  },

  cameraOnlyView: {
    flex: 1,
  },

  capturedWrapper: {
    flex: 1,
    overflow: "hidden",
  },

  capturedImage: {
    width: "100%",
    height: "100%",
  },

  wrapper: {
    flex: 1,
    overflow: "hidden",
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
  },

  placeholderBg: {
    flex: 1,
    backgroundColor: "#DDE2EF",
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    color: "#5C6272",
    fontSize: 18,
    fontWeight: "500",
  },
});