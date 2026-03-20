import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import TemoinsFormSection from "../components/TemoinsScreenComponents/TemoinsFormSection";
import TemoinsNextButtonSection from "../components/TemoinsScreenComponents/TemoinsNextButtonSection";

export default function TemoinsScreen({ navigation }) {
  const [witnesses, setWitnesses] = useState([
    { name: "", phone: "" },
    { name: "", phone: "" },
    { name: "", phone: "" },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangeWitness = (index, field, value) => {
    setWitnesses((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleNext = () => {
    navigation.navigate("SecondScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFE7FB" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBack}
          style={styles.backRow}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Y a-t-il des témoins?</Text>

        <Text style={styles.subtitle}>
          Vous pouvez renseigner jusqu’à 3 témoins.
        </Text>

        <TemoinsFormSection
          witnesses={witnesses}
          onChangeWitness={handleChangeWitness}
        />

        <TemoinsNextButtonSection onPress={handleNext} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFE7FB",
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 4,
    paddingBottom: 22,
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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

  title: {
    fontSize: 28,
    lineHeight: 34,
    color: "#1E1830",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#514B63",
    textAlign: "center",
    marginBottom: 18,
  },
});