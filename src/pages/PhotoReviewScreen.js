import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

import PhotoReviewHeader from "../components/PhotoReviewComponents/PhotoReviewHeader";
import ReviewList from "../components/PhotoReviewComponents/ReviewList";
import PhotoReviewContinueButton from "../components/PhotoReviewComponents/PhotoReviewContinueButton";

export default function PhotoReviewScreen({ navigation, route }) {
  const reviewItems = route?.params?.reviewItems || [];
  const capturedPhotos = route?.params?.capturedPhotos || {};

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRetake = (item) => {
    navigation.navigate("VuedensembleCaptureScreen", {
      retakeStep: item.id,
      capturedPhotos,
      fromReview: true,
    });
  };

  const handleContinue = () => {
    console.log("Continue from photo review");
    // navigation.navigate("NextScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FB" />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.contentInner}>
            <PhotoReviewHeader onBackPress={handleBackPress} />

            <ReviewList
              items={reviewItems}
              onRetakePress={handleRetake}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <PhotoReviewContinueButton onPress={handleContinue} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  contentInner: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },
  bottomArea: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    backgroundColor: "#F7F7FB",
  },
});