import React from "react";
import { SafeAreaView, View, StyleSheet, StatusBar, ScrollView } from "react-native";
import HomeHeader from "../components/HomeScreenComponents/HomeHeader";
import InjuryQuestionCard from "../components/HomeScreenComponents/InjuryQuestionCard";
import BottomNote from "../components/HomeScreenComponents/BottomNote";

export default function HomeScreen() {
  const handleInjuredPress = () => {
    console.log("Oui, quelqu’un est blessé");
  };

  const handleNoInjuredPress = () => {
    console.log("Non, personne n’est blessé");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4FA" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />

        <View style={styles.cardWrap}>
          <InjuryQuestionCard
            onInjuredPress={handleInjuredPress}
            onNoInjuredPress={handleNoInjuredPress}
          />
        </View>

        <BottomNote />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4FA",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 20,
  },

  cardWrap: {
    marginTop: 6,
  },
});