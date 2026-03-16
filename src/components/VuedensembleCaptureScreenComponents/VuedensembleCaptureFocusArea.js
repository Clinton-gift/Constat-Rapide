import React from "react";
import { View, StyleSheet, Image, useWindowDimensions } from "react-native";

export default function VuedensembleCaptureFocusArea({
  bgImage,
  focusImage,
  showPin,
  cameraOpen,
  capturedUri,
  cameraRef,
  permissionGranted,
  CameraViewComponent,
  cameraFacing,
  onCameraReady,
  onMountError,
}) {
  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  const previewWidth = width - (isSmall ? 92 : 82);
  const previewHeight = previewWidth * 0.54;
  const pinSize = isSmall ? 44 : 50;

  const showCamera = cameraOpen && permissionGranted;
  const showCapturedPhoto = !!capturedUri;

  if (showCamera) {
    return (
      <View style={styles.cameraOnlyWrapper}>
        {/* <CameraViewComponent
          ref={cameraRef}
          style={styles.cameraOnlyView}
          facing={cameraFacing}
        /> */}
        <CameraViewComponent
          ref={cameraRef}
          style={styles.cameraOnlyView}
          facing={cameraFacing}
          onCameraReady={onCameraReady}
          onMountError={onMountError}
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

  return (
    <View style={styles.wrapper}>
      <Image source={bgImage} style={styles.backgroundImage} resizeMode="cover" />

      <View style={styles.previewSection}>
        <View
          style={[
            styles.previewWrap,
            {
              width: previewWidth,
              height: previewHeight,
            },
          ]}
        >
          <Image source={focusImage} style={styles.previewImage} resizeMode="cover" />

          {showPin && (
            <View
              style={[
                styles.pinWrap,
                {
                  width: pinSize,
                  height: pinSize,
                },
              ]}
            >
              <View style={styles.pinHead} />
              <View style={styles.pinHole} />
              <View style={styles.pinPoint} />
            </View>
          )}

          <View style={styles.dashedBorder} />
        </View>
      </View>
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
    marginTop: 10,
    overflow: "hidden",
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  previewSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 110,
  },

  previewWrap: {
    position: "relative",
    borderRadius: 18,
    overflow: "visible",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },

  dashedBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderStyle: "dashed",
  },

  pinWrap: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    top: -26,
  },

  pinHead: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#4B8FE8",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },

  pinHole: {
    position: "absolute",
    top: 10,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#FFFFFF",
  },

  pinPoint: {
    position: "absolute",
    top: 25,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 18,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#4B8FE8",
  },
});