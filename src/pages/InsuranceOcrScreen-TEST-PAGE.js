import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { runInsuranceOcr } from "../utils/insuranceOcr";

export default function InsuranceOcrScreen() {
  const [imageUri, setImageUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const pickFromGallery = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission denied", "Media library permission is required.");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: false,
    });

    if (!res.canceled && res.assets?.length) {
      setImageUri(res.assets[0].uri);
      setResult(null);
      setProgress(0);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission denied", "Camera permission is required.");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: false,
    });

    if (!res.canceled && res.assets?.length) {
      setImageUri(res.assets[0].uri);
      setResult(null);
      setProgress(0);
    }
  };

  const extract = async () => {
    if (!imageUri) {
      Alert.alert("No image", "Please take or upload a document first.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      setProgress(0);

      const data = await runInsuranceOcr(imageUri, setProgress);
      setResult(data);

      if (!data.insuredName && !data.policyNumber) {
        Alert.alert(
          "Low OCR quality",
          "No reliable fields were extracted. Try a closer, straighter photo with better lighting."
        );
      }
    } catch (err) {
      console.error(err);
      Alert.alert("OCR failed", err.message || "Could not read this document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Insurance OCR</Text>
      <Text style={styles.subtitle}>
        Upload or snap a document, then extract insured name and policy number.
      </Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickFromGallery}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="contain" />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.extractButton, loading && styles.disabled]}
        onPress={extract}
        disabled={loading}
      >
        <Text style={styles.extractText}>
          {loading ? "Running OCR..." : "Extract Fields"}
        </Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.progressWrap}>
          <ActivityIndicator />
          <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        </View>
      )}

      {result && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Extracted fields</Text>

          <Text style={styles.label}>Insured name</Text>
          <Text style={styles.value}>{result.insuredName || "-"}</Text>

          <Text style={styles.label}>Policy number</Text>
          <Text style={styles.value}>{result.policyNumber || "-"}</Text>

          <Text style={styles.label}>Raw OCR text</Text>
          <Text style={styles.rawText}>{result.rawText || "-"}</Text>

          <Text style={styles.label}>Top policy candidates</Text>
          <Text style={styles.rawText}>
            {(result.debug?.policyCandidates || [])
              .map((c) => `${c.value} | ${c.score} | ${c.source}`)
              .join("\n")}
          </Text>

          <Text style={styles.label}>Top name candidates</Text>
          <Text style={styles.rawText}>
            {(result.debug?.nameCandidates || [])
              .map((c) => `${c.value} | ${c.score} | ${c.source}`)
              .join("\n")}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: "#1f6feb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  preview: {
    width: "100%",
    height: 300,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    marginBottom: 16,
  },
  placeholder: {
    width: "100%",
    height: 220,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  placeholderText: {
    color: "#777",
  },
  extractButton: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  extractText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
  progressWrap: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressText: {
    fontSize: 14,
    color: "#444",
  },
  card: {
    marginTop: 20,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#666",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginTop: 4,
  },
  rawText: {
    fontSize: 13,
    color: "#222",
    marginTop: 6,
    lineHeight: 20,
  },
});