import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TemoinsInputCard from "./TemoinsInputCard";

export default function TemoinsFormSection({
  witnesses,
  onChangeWitness,
}) {
  return (
    <View style={styles.wrapper}>
      {witnesses.map((witness, index) => (
        <View key={index} style={styles.block}>
          <Text style={styles.label}>Témoin {index + 1}</Text>

          <TemoinsInputCard
            name={witness.name}
            phone={witness.phone}
            onChangeName={(value) => onChangeWitness(index, "name", value)}
            onChangePhone={(value) => onChangeWitness(index, "phone", value)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },

  block: {
    marginBottom: 16,
  },

  label: {
    fontSize: 20,
    color: "#1E1830",
    fontWeight: "700",
    marginBottom: 8,
    paddingLeft: 8,
  },
});