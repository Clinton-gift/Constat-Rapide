import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";

function VehicleCard({
  label,
  image,
  selected,
  onPress,
  isMobile,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, selected && styles.selectedCard]}
      onPress={onPress}
    >
      <View style={styles.imageWrap}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={[
              styles.cardImage,
              {
                height: isMobile ? 195 : 230,
              },
            ]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.cardImage,
              styles.placeholderImage,
              {
                height: isMobile ? 195 : 230,
              },
            ]}
          />
        )}

        {selected && <View style={styles.blurOverlay} />}

        {selected && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}
      </View>

      <Text
        style={[
          styles.cardLabel,
          {
            fontSize: isMobile ? 18 : 20,
            marginTop: 12,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function CirconstancesVehicleSelectionCards({
  selectedVehicle,
  setSelectedVehicle,
  yourVehicleImage,
  otherVehicleImage,
}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.row}>
      <VehicleCard
        label="Votre véhicule"
        image={yourVehicleImage}
        selected={selectedVehicle === "your_vehicle"}
        onPress={() => setSelectedVehicle("your_vehicle")}
        isMobile={isMobile}
      />

      <VehicleCard
        label="Autre véhicule"
        image={otherVehicleImage}
        selected={selectedVehicle === "other_vehicle"}
        onPress={() => setSelectedVehicle("other_vehicle")}
        isMobile={isMobile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    borderWidth: 2,
    borderColor: "#E7E7EE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCard: {
    borderColor: "#2A86E8",
  },
  imageWrap: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#D8D8D8",
  },
  placeholderImage: {
    backgroundColor: "#D9DDE7",
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.20)",
  },
  checkBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2A86E8",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  checkText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 18,
  },
  cardLabel: {
    textAlign: "center",
    color: "#1A1A1A",
    fontWeight: "500",
  },
});