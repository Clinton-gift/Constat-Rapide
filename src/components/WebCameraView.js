import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { View, StyleSheet, Platform } from "react-native";

const WebCameraView = forwardRef(
  (
    {
      style,
      facing = "back",
      onCameraReady,
      onMountError,
      ...rest
    },
    ref
  ) => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    useImperativeHandle(ref, () => ({
      takePictureAsync: async ({ quality = 0.8 } = {}) => {
        if (!videoRef.current) return null;
        const video = videoRef.current;

        const width = video.videoWidth;
        const height = video.videoHeight;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, width, height);

        const mimeType = "image/jpeg";
        const dataUrl = canvas.toDataURL(mimeType, quality);

        return { uri: dataUrl };
      },
      stop: () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      },
    }));

    useEffect(() => {
      if (Platform.OS !== "web") return;

      const constraints = {
        video: {
          facingMode: facing === "front" ? "user" : "environment",
        },
      };

      const startStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          streamRef.current = stream;
        } catch (error) {
          // Some browsers / devices may not support facingMode constraints.
          // Retry with a simpler request to get the default camera.
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
          } catch (innerError) {
            if (onMountError) onMountError(innerError);
            return;
          }
        }

        if (videoRef.current && streamRef.current) {
          videoRef.current.srcObject = streamRef.current;
          await videoRef.current.play();
        }

        if (onCameraReady) onCameraReady();
      };

      startStream();

      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };
    }, [facing, onCameraReady, onMountError]);

    return (
      <View style={[styles.wrapper, style]} {...rest}>
        <video ref={videoRef} style={styles.video} playsInline muted />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export default WebCameraView;
