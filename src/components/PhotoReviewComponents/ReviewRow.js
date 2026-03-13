import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default function ReviewRow({ item, onRetakePress, isLast }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={[
            styles.thumbnail,
            {
              width: isMobile ? 130 : 150,
              height: isMobile ? 82 : 92,
            },
          ]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.thumbnail,
            {
              width: isMobile ? 130 : 150,
              height: isMobile ? 82 : 92,
            },
          ]}
        />
      )}

      <View style={styles.content}>
        <View style={styles.textAndCheckRow}>
          <Text
            style={[
              styles.title,
              {
                fontSize: isMobile ? 17 : 20,
                lineHeight: isMobile ? 24 : 28,
              },
            ]}
          >
            {item.title}
          </Text>

          <View style={styles.checkCircle}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.retakeButton}
            onPress={() => onRetakePress(item)}
          >
            <Text style={styles.retakeButtonText}>Reprendre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F7F6FB",
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0DDE8",
  },
  thumbnail: {
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: "#DADADA",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    minHeight: 82,
  },
  textAndCheckRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  title: {
    flex: 1,
    color: "#1A1A1A",
    fontWeight: "700",
    paddingTop: 3,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#43B16D",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  buttonRow: {
    alignItems: "flex-end",
    marginTop: 12,
  },
  retakeButton: {
    minWidth: 128,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#E7EAF7",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  retakeButtonText: {
    color: "#35527A",
    fontSize: 16,
    fontWeight: "500",
  },
});