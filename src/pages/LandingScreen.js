import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";

import Header from "../components/LandingComponents/Header";
import Body from "../components/LandingComponents/Body";

export default function LandingScreen({ navigation }) {
  const handleStartPress = () => {
    navigation.navigate("ProcedureIntroScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5EEFF" />
      <View style={styles.container}>
        <View style={styles.contentInner}>
          <Header />
          <Body onStartPress={handleStartPress} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5EEFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5EEFF",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  contentInner: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },
});