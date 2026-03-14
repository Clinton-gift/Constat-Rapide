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
    bgImage: require("../../assets/bgimg.png"),
    focusImage: require("../../assets/focusimg.png"),
    showPin: true,
    usesFocusArea: true,
  },
  {
    id: 2,
    stepLabel: "2 sur 7",
    title: "Votre véhicule",
    instruction: "Prenéz ene photo complète\nde votre véhicule.",
    bgImage: require("../../assets/bgimg2.png"),
    usesFocusArea: false,
  },
  {
    id: 3,
    stepLabel: "3 sur 7",
    title: "Autre véhicule",
    instruction: "Prenéz une photo complète\nde l’autre véhicule.",
    bgImage: require("../../assets/bgimg3.png"),
    usesFocusArea: false,
  },
  {
    id: 4,
    stepLabel: "4 sur 7",
    title: "Votre plaque",
    instruction: "Prenéz une photo claire de\nvotre plaque d'immatriculation",
    bgImage: require("../../assets/bgimg4.png"),
    usesFocusArea: false,
  },
  {
    id: 5,
    stepLabel: "5 sur 7",
    title: "Plaque de l’autre véhicule",
    instruction:
      "Prenez une photo claire de\nla plaque d'immatriculation\nde l’autre véhicule.",
    bgImage: require("../../assets/bgimg5.png"),
    usesFocusArea: false,
  },
  {
    id: 6,
    stepLabel: "6 sur 7",
    title: "Dègâts sur votre véhicule",
    instruction: "Prenez une photo des dégâts\nsur votre véhicule.",
    bgImage: require("../../assets/bgimg6.png"),
    usesFocusArea: false,
  },
  {
    id: 7,
    stepLabel: "7 sur 7",
    title: "Dègâts sur l’autre véhicule",
    instruction: "Prenez une photo des dégâts\nsur l’autre véhicule.",
    bgImage: require("../../assets/bgimg7.png"),
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

    const existingPhoto = incomingPhotos?.[retakeStep];
    if (retakeStep && existingPhoto?.image) {
      setCapturedUri(existingPhoto.image);
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

      if (!cameraOpen) {
        setCameraOpen(true);
        setCameraFacing("back");
        setCapturedUri(null);
        setHasValidCapture(false);
        setFeedbackType(null);
        setFeedbackMessage("");
        return;
      }

      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });

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
    if (!hasValidCapture) return;

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