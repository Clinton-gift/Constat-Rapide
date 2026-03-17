import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { LinearGradient } from "expo-linear-gradient";

export default function Body({
  qrValue,
  onWhatsAppPress,
  onContinueWithoutOtherDriver,
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>
        Choisissez une façon d’inviter{"\n"}l’autre conducteur
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>1. Scanner le QR code</Text>

        <Text style={styles.sectionDescription}>
          Demandez à l’autre conducteur de scanner ce QR code sur votre téléphone.
        </Text>

        <View style={styles.qrWrapper}>
          <View style={styles.qrBox}>
            <QRCode value={qrValue} size={120} />
          </View>
        </View>

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>ou</Text>
          <View style={styles.orLine} />
        </View>

        <Text style={styles.sectionTitle}>2. Envoyer par WhatsApp</Text>

        <Text style={styles.sectionDescription}>
          Envoyez-lui directement le lien pour compléter sa partie.
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onWhatsAppPress}
          style={styles.whatsappButtonWrapper}
        >
          <LinearGradient
            colors={["#6CCB84", "#49A96C"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.whatsappButton}
          >
            <View style={styles.whatsappIconPlaceholder}>
              <Image
                source={require("../../../assets/icons/whatsapp.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.whatsappButtonText}>Envoyer par WhatsApp</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onContinueWithoutOtherDriver}
        style={styles.skipButton}
      >
        <Text style={styles.skipButtonText}>
          Continuer sans lui pour le moment
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
    color: "#21212A",
    textAlign: "center",
    marginBottom: 18,
  },
  card: {
    width: "100%",
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "#E7DDF8",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#1F1F26",
    textAlign: "center",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4C4F5F",
    textAlign: "left",
    marginBottom: 14,
  },
  qrWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  qrBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D8D3E6",
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 16,
    lineHeight: 22,
    color: "#3D3D46",
    fontWeight: "500",
  },
  whatsappButtonWrapper: {
    marginTop: 6,
  },
  whatsappButton: {
    height: 44,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  whatsappIconPlaceholder: {
    width: 22,
    height: 22,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
  },
  whatsappButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
  },
  skipButton: {
    marginTop: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  skipButtonText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#31364A",
    fontWeight: "400",
    textAlign: "center",
  },
});