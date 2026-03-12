import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useWindowDimensions,
} from "react-native";

import VehicleTypeHeader from "./VehicleTypeHeader";
import VehicleTypeGrid from "./VehicleTypeGrid";
import VehicleTypeContinueButton from "./VehicleTypeContinueButton";

export default function SecondScreen({ navigation }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  const handleContinue = () => {
  if (!selectedVehicle) return;

  navigation.navigate("VuedensembleCaptureScreen");
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FB" />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View
            style={[
              styles.contentInner,
              {
                maxWidth: isMobile ? "100%" : 760,
                alignSelf: "center",
              },
            ]}
          >
            <VehicleTypeHeader />

            <VehicleTypeGrid
              selectedVehicle={selectedVehicle}
              setSelectedVehicle={setSelectedVehicle}
            />

            <VehicleTypeContinueButton
              onPress={handleContinue}
              disabled={!selectedVehicle}
            />
          </View>
        </ScrollView>
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
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 24,
  },
  contentInner: {
    width: "100%",
  },
});