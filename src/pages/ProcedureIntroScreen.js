import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

import Header from "../components/ProcedureIntroComponents/Header";
import Body from "../components/ProcedureIntroComponents/Body";

export default function ProcedureIntroScreen({ navigation }) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleStartProcessPress = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5EEFF" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentInner}>
            <Header onBackPress={handleBackPress} />
            <Body onStartProcessPress={handleStartProcessPress} />
          </View>
        </ScrollView>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  contentInner: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },
});