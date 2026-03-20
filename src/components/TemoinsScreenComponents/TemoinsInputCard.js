import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";

export default function TemoinsInputCard({
  name,
  phone,
  onChangeName,
  onChangePhone,
}) {
  const handlePhoneChange = (value) => {
    // Keep only digits and +
    let cleaned = value.replace(/[^0-9+]/g, "");

    // Keep only one + and only at the beginning
    const hasLeadingPlus = cleaned.startsWith("+");
    cleaned = cleaned.replace(/\+/g, "");

    // Digits only for validation logic
    let digits = cleaned;

    // Rule:
    // - up to 9 digits: allowed normally
    // - if more than 9 digits, it must start with 237
    // - max digits = 12
    if (digits.length > 9) {
      if (digits.startsWith("237")) {
        digits = digits.slice(0, 12);
      } else {
        digits = digits.slice(0, 9);
      }
    }

    // Rebuild final value with optional leading +
    const finalValue = hasLeadingPlus ? `+${digits}` : digits;

    onChangePhone(finalValue);
  };

  return (
    <View style={styles.card}>
      <View style={styles.inputRow}>
        <Text style={styles.icon}>👤</Text>
        <TextInput
          value={name}
          onChangeText={onChangeName}
          placeholder="Nom"
          placeholderTextColor="#8E87A3"
          style={styles.input}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.inputRow}>
        <Text style={styles.phoneIcon}>✚</Text>
        <TextInput
          value={phone}
          onChangeText={handlePhoneChange}
          placeholder="Téléphone"
          placeholderTextColor="#8E87A3"
          keyboardType="phone-pad"
          style={styles.input}
          maxLength={13}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8F5FF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(80,60,120,0.08)",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
  },

  icon: {
    fontSize: 22,
    marginRight: 12,
    color: "#B8B0CF",
    width: 28,
    textAlign: "center",
  },

  phoneIcon: {
    fontSize: 22,
    marginRight: 12,
    color: "#46C5A8",
    width: 28,
    textAlign: "center",
  },

  input: {
    flex: 1,
    fontSize: 17,
    color: "#2B2340",
    paddingVertical: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(80,60,120,0.10)",
    marginVertical: 1,
  },
});