import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";

import DegatsAutresIllustrationSection from "../components/DegatsAutresScreenComponents/DegatsAutresIllustrationSection";
import DegatsAutresActionsSection from "../components/DegatsAutresScreenComponents/DegatsAutresActionsSection";

const illustrationImage = require("../../assets/hitcar.webp");

export default function DegatsAutresScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState("oui");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectOui = () => {
    setSelectedOption("oui");
    navigation.navigate("TemoinsScreen");
  };

  const handleSelectNon = () => {
    setSelectedOption("non");
    navigation.navigate("TemoinsScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFE7FB" />

      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBack}
          style={styles.backRow}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Dégâts autres{"\n"}qu’aux véhicules?</Text>

          <DegatsAutresIllustrationSection imageSource={illustrationImage} />

          <DegatsAutresActionsSection
            selectedOption={selectedOption}
            onPressOui={handleSelectOui}
            onPressNon={handleSelectNon}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFE7FB",
  },

  container: {
    flex: 1,
    backgroundColor: "#EFE7FB",
    paddingHorizontal: 20,
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    marginBottom: 18,
  },

  backArrow: {
    fontSize: 28,
    color: "#4B8FE8",
    marginRight: 6,
    lineHeight: 28,
    fontWeight: "400",
  },

  backText: {
    fontSize: 16,
    color: "#4B8FE8",
    fontWeight: "500",
  },

  content: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    color: "#1E1830",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 26,
  },
});