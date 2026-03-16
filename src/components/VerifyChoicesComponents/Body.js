import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Body({
  items,
  onDeletePress,
  onPrimaryPress,
  onSecondaryPress,
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.listWrapper}>
        {items.map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={styles.leftSection}>
              {item.icon ? (
                <Image
                  source={item.icon}
                  style={styles.icon}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.iconPlaceholder} />
              )}

              <Text style={styles.label}>{item.label}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.deleteButton}
              onPress={() => onDeletePress(item.id)}
            >
              <Text style={styles.deleteText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.actionsWrapper}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPrimaryPress}
          style={styles.primaryWrapper}
        >
          <LinearGradient
            colors={["#3E74CC", "#6FA4F0"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryText}>Décrire l’autre véhicule</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onSecondaryPress}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Retour aux circonstances</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 2,
  },
  listWrapper: {
    paddingTop: 2,
  },
  row: {
    minHeight: 58,
    borderRadius: 10,
    backgroundColor: "#F8F8FC",
    borderWidth: 1,
    borderColor: "#D9DEEA",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    marginRight: 10,
    backgroundColor: "#D9DEEA",
    borderRadius: 4,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: "#2C2C35",
    fontWeight: "500",
  },
  deleteButton: {
    minWidth: 74,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#F0F3FA",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  deleteText: {
    fontSize: 12,
    color: "#8DA1C1",
    fontWeight: "500",
  },
  actionsWrapper: {
    paddingTop: 14,
    marginTop: 130,
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
});