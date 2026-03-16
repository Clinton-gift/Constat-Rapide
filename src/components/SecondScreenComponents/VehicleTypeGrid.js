import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";

const VEHICLES = [
  {
    id: "berline",
    label: "Berline",
    image: require("../../../assets/vehicles/berline.webp"),
    scale: 1.7,
  },
  {
    id: "break",
    label: "Break",
    image: require("../../../assets/vehicles/break3.webp"),
    scale: 1.7,
  },
  {
    id: "citadine",
    label: "Citadine",
    image: require("../../../assets/vehicles/citadine.webp"),
    scale: 1.7,
  },
  {
    id: "suv",
    label: "SUV",
    image: require("../../../assets/vehicles/SUV.webp"),
    scale: 0.8,
  },
  {
    id: "petite_voiture",
    label: "Petite voiture",
    image: require("../../../assets/vehicles/break2.webp"),
    scale: 1.7,
  },
  {
    id: "utilitaire",
    label: "Utilitaire",
    image: require("../../../assets/vehicles/utilitaire.webp"),
    scale: 1.7,
  },
  {
    id: "pickup",
    label: "Pick-up",
    image: require("../../../assets/vehicles/Pick-up.webp"),
    scale: 1.0,
  },
  {
    id: "autre",
    label: "Autre",
    image: require("../../../assets/vehicles/autre.webp"),
    scale: 0.75,
  },
];

export default function VehicleTypeGrid({
  selectedVehicle,
  setSelectedVehicle,
}) {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const labelSize = isMobile ? 18 : 22;
  const cardMinHeight = isMobile ? 145 : 175;
  const badgeSize = isMobile ? 28 : 34;

  return (
    <View style={styles.grid}>
      {VEHICLES.map((item) => {
        const isSelected = selectedVehicle === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            style={[
              styles.card,
              {
                width: "48%",
                minHeight: cardMinHeight,
                paddingTop: isMobile ? 8 : 12,
                paddingBottom: isMobile ? 10 : 14,
              },
              isSelected && styles.selectedCard,
            ]}
            onPress={() => setSelectedVehicle(item.id)}
          >
            {isSelected && (
              <View
                style={[
                  styles.checkBadge,
                  {
                    width: badgeSize,
                    height: badgeSize,
                    borderRadius: badgeSize / 2,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.checkText,
                    { fontSize: isMobile ? 16 : 18 },
                  ]}
                >
                  ✓
                </Text>
              </View>
            )}

            <View
              style={[
                styles.imageBox,
                { height: isMobile ? 72 : 105 },
              ]}
            >
              <Image
                source={item.image}
                style={[
                  styles.vehicleImage,
                  { transform: [{ scale: item.scale || 1 }] },
                  item.id === "autre" && styles.autreImage,
                ]}
                resizeMode="contain"
              />
            </View>

            <Text
              style={[
                styles.cardLabel,
                {
                  fontSize: labelSize,
                  marginTop: isMobile ? 0 : 4,
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 8,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#E8E8EE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  selectedCard: {
    borderColor: "#2A86E8",
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#2A86E8",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  checkText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  imageBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
    overflow: "visible",
  },
  vehicleImage: {
    width: "200%",
    height: "200%",
 
  },
  cardLabel: {
    fontWeight: "500",
    color: "#111111",
    textAlign: "center",
  },
});