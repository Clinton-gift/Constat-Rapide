import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, View, StyleSheet, StatusBar, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import VuedensembleCaptureProgress from "../components/VuedensembleCaptureScreenComponents/VuedensembleCaptureProgress";
import VuedensembleCaptureInstructionCard from "../components/VuedensembleCaptureScreenComponents/VuedensembleCaptureInstructionCard";
import VuedensembleCaptureFocusArea from "../components/VuedensembleCaptureScreenComponents/VuedensembleCaptureFocusArea";
import VuedensembleCaptureActions from "../components/VuedensembleCaptureScreenComponents/VuedensembleCaptureActions";
import VuedensembleCaptureStepBackground from "../components/VuedensembleCaptureScreenComponents/VuedensembleCaptureStepBackground";

const stepConfigs = [
  {
    id: 1,
    stepLabel: "1 sur 7",
    title: "Vue d’ensemble",
    instruction: "Photographiez les deux véhicules\ndans la scène.",
    bgImage: require("../../assets/bgimg.webp"),
    focusImage: require("../../assets/focusimg.webp"),
    showPin: true,
    usesFocusArea: true,
  },
  {
    id: 2,
    stepLabel: "2 sur 7",
    title: "Votre véhicule",
    instruction: "Prenez une photo complète\nde votre véhicule.",
    bgImage: require("../../assets/bgimg2.webp"),
    usesFocusArea: false,
  },
  {
    id: 3,
    stepLabel: "3 sur 7",
    title: "Autre véhicule",
    instruction: "Prenez une photo complète\nde l’autre véhicule.",
    bgImage: require("../../assets/bgimg3.webp"),
    usesFocusArea: false,
  },
  {
    id: 4,
    stepLabel: "4 sur 7",
    title: "Votre plaque",
    instruction: "Prenez une photo claire de\nvotre plaque d'immatriculation.",
    bgImage: require("../../assets/bgimg4.webp"),
    usesFocusArea: false,
  },
  {
    id: 5,
    stepLabel: "5 sur 7",
    title: "Plaque de l’autre véhicule",
    instruction:
      "Prenez une photo claire de\nla plaque d'immatriculation\nde l’autre véhicule.",
    bgImage: require("../../assets/bgimg5.webp"),
    usesFocusArea: false,
  },
  {
    id: 6,
    stepLabel: "6 sur 7",
    title: "Dégâts sur votre véhicule",
    instruction: "Prenez une photo des dégâts\nsur votre véhicule.",
    bgImage: require("../../assets/bgimg6.webp"),
    usesFocusArea: false,
  },
  {
    id: 7,
    stepLabel: "7 sur 7",
    title: "Dégâts sur l’autre véhicule",
    instruction: "Prenez une photo des dégâts\nsur l’autre véhicule.",
    bgImage: require("../../assets/bgimg7.webp"),
    usesFocusArea: false,
  },
];

export default function VuedensembleCaptureScreen({ navigation, route }) {
  const totalSteps = 7;
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const retakeStep = route?.params?.retakeStep ?? null;
  const incomingPhotos = route?.params?.capturedPhotos ?? null;
  const fromReview = route?.params?.fromReview ?? false;

  const [currentStep, setCurrentStep] = useState(retakeStep || 1);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("back");
  const [capturedUri, setCapturedUri] = useState(null);
  const [hasValidCapture, setHasValidCapture] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [capturedPhotos, setCapturedPhotos] = useState(incomingPhotos || {});

  useEffect(() => {
    if (retakeStep) {
      setCurrentStep(retakeStep);
    }

    if (incomingPhotos) {
      setCapturedPhotos(incomingPhotos);
    }

    if (retakeStep && incomingPhotos?.[retakeStep]?.image) {
      setCapturedUri(incomingPhotos[retakeStep].image);
      setHasValidCapture(true);
      setFeedbackType("good");
      setFeedbackMessage("👍 Photo correcte.");
    }
  }, [retakeStep, incomingPhotos]);

  const currentConfig = useMemo(() => {
    return stepConfigs.find((step) => step.id === currentStep) ?? stepConfigs[0];
  }, [currentStep]);

  const resetStepState = () => {
    setCameraOpen(false);
    setCapturedUri(null);
    setHasValidCapture(false);
    setFeedbackType(null);
    setFeedbackMessage("");
  };

  const validatePhotoMock = () => {
    return { ok: true, message: "👍 Photo correcte." };
  };

  const handleSwitchCamera = () => {
    setCameraFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const handleCameraPress = async () => {
    try {
      if (!permission?.granted) {
        const result = await requestPermission();
        if (!result.granted) {
          Alert.alert(
            "Permission caméra refusée",
            "Veuillez autoriser l’accès à la caméra pour continuer."
          );
          return;
        }
      }

      // First press: open camera and force BACK camera as default
      if (!cameraOpen) {
        setCameraFacing("back");
        setCapturedUri(null);
        setHasValidCapture(false);
        setFeedbackType(null);
        setFeedbackMessage("");
        setCameraOpen(true);
        return;
      }

      // Second press while camera is open: take photo
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });

      if (!photo?.uri) {
        setCameraOpen(false);
        setHasValidCapture(false);
        setFeedbackType("bad");
        setFeedbackMessage("Impossible de prendre la photo. Réessayez.");
        return;
      }

      setCapturedUri(photo.uri);
      setCameraOpen(false);

      const validation = validatePhotoMock();

      if (validation.ok) {
        setHasValidCapture(true);
        setFeedbackType("good");
        setFeedbackMessage(validation.message);

        setCapturedPhotos((prev) => ({
          ...prev,
          [currentStep]: {
            id: currentStep,
            title: currentConfig.title,
            image: photo.uri,
          },
        }));
      } else {
        setHasValidCapture(false);
        setFeedbackType("bad");
        setFeedbackMessage("Image floue. Veuillez reprendre la photo.");
      }
    } catch (error) {
      setCameraOpen(false);
      setHasValidCapture(false);
      setFeedbackType("bad");
      setFeedbackMessage("Impossible de prendre la photo. Réessayez.");
    }
  };

  const handleContinuePress = () => {
    if (!hasValidCapture || !capturedUri) return;

    const updatedPhotos = {
      ...capturedPhotos,
      [currentStep]: {
        id: currentStep,
        title: currentConfig.title,
        image: capturedUri,
      },
    };

    const reviewItems = stepConfigs.map((step) => ({
      id: step.id,
      title: step.title,
      image: updatedPhotos[step.id]?.image || null,
    }));

    if (fromReview) {
      navigation.replace("PhotoReviewScreen", {
        reviewItems,
        capturedPhotos: updatedPhotos,
      });
      return;
    }

    if (currentStep < totalSteps) {
      setCapturedPhotos(updatedPhotos);
      setCurrentStep((prev) => prev + 1);
      resetStepState();
      return;
    }

    navigation.navigate("PhotoReviewScreen", {
      reviewItems,
      capturedPhotos: updatedPhotos,
    });
  };

  const showTopUi = !cameraOpen;
  const useFocusArea = currentConfig.usesFocusArea;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEEF6" />

      <View style={styles.container}>
        {showTopUi && (
          <>
            <VuedensembleCaptureProgress
              totalSteps={totalSteps}
              currentStep={currentStep}
            />

            <VuedensembleCaptureInstructionCard
              stepLabel={currentConfig.stepLabel}
              title={currentConfig.title}
              instruction={currentConfig.instruction}
            />
          </>
        )}

        {useFocusArea ? (
          <VuedensembleCaptureFocusArea
            bgImage={currentConfig.bgImage}
            focusImage={currentConfig.focusImage}
            showPin={currentConfig.showPin}
            cameraOpen={cameraOpen}
            capturedUri={capturedUri}
            cameraRef={cameraRef}
            permissionGranted={!!permission?.granted}
            CameraViewComponent={CameraView}
            cameraFacing={cameraFacing}
          />
        ) : (
          <VuedensembleCaptureStepBackground
            bgImage={currentConfig.bgImage}
            cameraOpen={cameraOpen}
            capturedUri={capturedUri}
            cameraRef={cameraRef}
            permissionGranted={!!permission?.granted}
            CameraViewComponent={CameraView}
            cameraFacing={cameraFacing}
          />
        )}

        <VuedensembleCaptureActions
          hasCaptured={hasValidCapture}
          onCapturePress={handleCameraPress}
          onContinuePress={handleContinuePress}
          feedbackType={feedbackType}
          feedbackMessage={feedbackMessage}
          cameraOpen={cameraOpen}
          onSwitchCamera={handleSwitchCamera}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ECEEF6",
  },

  container: {
    flex: 1,
    backgroundColor: "#ECEEF6",
  },
});