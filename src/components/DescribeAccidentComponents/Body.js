import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Body({
  selectedMethod,
  onSelectVoice,
  onSelectText,
  onContinue,
  onReturn,
  continueDisabled,
  voiceModalVisible,
  textModalVisible,
  onCloseVoiceModal,
  onCloseTextModal,
  onStartRecording,
  onStopRecording,
  isRecording,
  hasSavedVoice,
  accidentText,
  onChangeAccidentText,
  hasSavedText,
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.cardsRow}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onSelectVoice}
          style={[
            styles.optionCard,
            selectedMethod === "voice" && styles.optionCardSelected,
          ]}
        >
          <View style={styles.iconBox}>
            <Image
  source={require("../../../assets/icons/mic.png")}
  style={styles.icon}
  resizeMode="contain"
/>
          </View>

          <Text style={styles.optionLabel}>Par message vocal</Text>

          {hasSavedVoice ? (
            <Text style={styles.savedText}>Enregistré</Text>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onSelectText}
          style={[
            styles.optionCard,
            selectedMethod === "text" && styles.optionCardSelected,
          ]}
        >
          <View style={styles.iconBox}>
            <Image
  source={require("../../../assets/icons/notepad.png")}
  style={styles.icon}
  resizeMode="contain"
/>
          </View>

          <Text style={styles.optionLabel}>Par texte</Text>

          {hasSavedText ? (
            <Text style={styles.savedText}>Enregistré</Text>
          ) : null}
        </TouchableOpacity>
      </View>

      <View style={styles.actionsWrapper}>
        <TouchableOpacity
          activeOpacity={continueDisabled ? 1 : 0.9}
          onPress={onContinue}
          style={styles.primaryWrapper}
          disabled={continueDisabled}
        >
          <LinearGradient
            colors={
              continueDisabled
                ? ["#C9D3E8", "#D9E1F0"]
                : ["#3E74CC", "#6FA4F0"]
            }
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryText}>Continuer</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onReturn}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Retour</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={voiceModalVisible}
        animationType="slide"
        transparent
        onRequestClose={onCloseVoiceModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalTopRow}>
              <View />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onCloseVoiceModal}
                style={styles.modalBackButton}
              >
                <Text style={styles.modalBackText}>Retour</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Message vocal</Text>
            <Text style={styles.modalSubtitle}>
              Enregistrez votre description de l’accident.
            </Text>

            <View style={styles.voiceStateBox}>
              <Text style={styles.voiceStateText}>
                {isRecording
                  ? "Enregistrement en cours..."
                  : hasSavedVoice
                  ? "Un enregistrement a été sauvegardé."
                  : "Aucun enregistrement pour le moment."}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onStartRecording}
              disabled={isRecording}
              style={[
                styles.recordButton,
                isRecording && styles.recordButtonDisabled,
              ]}
            >
              <Text style={styles.recordButtonText}>
                Démarrer l’enregistrement
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onStopRecording}
              disabled={!isRecording}
              style={[
                styles.stopButton,
                !isRecording && styles.stopButtonDisabled,
              ]}
            >
              <Text style={styles.stopButtonText}>
                Arrêter l’enregistrement
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={textModalVisible}
        animationType="slide"
        transparent
        onRequestClose={onCloseTextModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalTopRow}>
              <View />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onCloseTextModal}
                style={styles.modalBackButton}
              >
                <Text style={styles.modalBackText}>Retour</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Décrivez par texte</Text>
            <Text style={styles.modalSubtitle}>
              Écrivez ce qu’il s’est passé.
            </Text>

            <TextInput
              value={accidentText}
              onChangeText={onChangeAccidentText}
              placeholder="Décrivez l’accident ici..."
              placeholderTextColor="#94A0B8"
              style={styles.textArea}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  optionCard: {
    flex: 1,
    minHeight: 160,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE3EF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  optionCardSelected: {
    borderColor: "#4D83D8",
    backgroundColor: "#F4F8FF",
  },
  iconBox: {
    width: 88,
    height: 88,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  icon: {
    width: 74,
    height: 74,
  },
  optionLabel: {
    fontSize: 15,
    color: "#2D2D35",
    fontWeight: "500",
    textAlign: "center",
  },
  savedText: {
    marginTop: 8,
    fontSize: 13,
    color: "#4D83D8",
    fontWeight: "600",
  },
  actionsWrapper: {
    paddingTop: 110,
  },
  primaryWrapper: {
    width: "100%",
  },
  primaryButton: {
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  secondaryButton: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 28,
  },
  secondaryText: {
    color: "#5D78A6",
    fontSize: 15,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(21, 21, 21, 0.28)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 20,
  },
  modalTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalBackButton: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  modalBackText: {
    color: "#336DB4",
    fontSize: 15,
    fontWeight: "600",
  },
  modalTitle: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "700",
    color: "#161616",
    textAlign: "center",
  },
  modalSubtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#596275",
    textAlign: "center",
    marginBottom: 18,
  },
  voiceStateBox: {
    minHeight: 80,
    borderRadius: 16,
    backgroundColor: "#F5F7FC",
    borderWidth: 1,
    borderColor: "#DCE3F0",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  voiceStateText: {
    textAlign: "center",
    fontSize: 15,
    color: "#364152",
    fontWeight: "500",
  },
  recordButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#3E74CC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  recordButtonDisabled: {
    opacity: 0.45,
  },
  recordButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  stopButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#E95A5A",
    justifyContent: "center",
    alignItems: "center",
  },
  stopButtonDisabled: {
    opacity: 0.45,
  },
  stopButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  textArea: {
    minHeight: 220,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE3F0",
    backgroundColor: "#F8FAFD",
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1E2430",
  },
});