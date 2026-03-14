import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

function CheckBox({ selected }) {
  return (
    <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
      {selected ? <Text style={styles.checkmark}>✓</Text> : null}
    </View>
  );
}

function OptionRow({
  label,
  icon,
  iconWidth,
  iconHeight,
  selected,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.optionRow, selected && styles.optionRowSelected]}
      onPress={onPress}
    >
      <View style={styles.leftIconBox}>
        <Image
          source={icon}
          style={[
            styles.leftIconImage,
            {
              width: iconWidth || 39,
              height: iconHeight || 39,
            },
            selected && styles.leftIconImageSelected,
          ]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.labelContainer}>
        <Text
          style={[styles.optionLabel, selected && styles.optionLabelSelected]}
          numberOfLines={2}
        >
          {label}
        </Text>
      </View>

      <CheckBox selected={selected} />
    </TouchableOpacity>
  );
}

export default function OptionsList({
  options,
  selectedValue,
  onSelectOption,
  onSelectNone,
}) {
  return (
    <View style={styles.wrapper}>
      {options.map((option) => {
        const selected = selectedValue === option.id;

        return (
          <OptionRow
            key={option.id}
            label={option.label}
            icon={option.icon}
            iconWidth={option.iconWidth}
            iconHeight={option.iconHeight}
            selected={selected}
            onPress={() => onSelectOption(option.id)}
          />
        );
      })}

      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.noneButton,
          selectedValue === "none" && styles.noneButtonSelected,
        ]}
        onPress={onSelectNone}
      >
        <View style={styles.noneButtonInner}>
          <View style={styles.noneTextWrap}>
            <Text
              style={[
                styles.noneButtonText,
                selectedValue === "none" && styles.noneButtonTextSelected,
              ]}
            >
              Aucune de ces circonstances
            </Text>
          </View>

          <CheckBox selected={selectedValue === "none"} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 4,
  },

  optionRow: {
    minHeight: 76,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9E0EC",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
  },

  optionRowSelected: {
    backgroundColor: "#4E82DA",
    borderColor: "#4E82DA",
  },

  leftIconBox: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  leftIconImage: {
    tintColor: "#4E82DA",
  },

  leftIconImageSelected: {
    tintColor: "#FFFFFF",
  },

  labelContainer: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 10,
  },

  optionLabel: {
    color: "#1F2430",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },

  optionLabelSelected: {
    color: "#FFFFFF",
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#C8D0DE",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    flexShrink: 0,
  },

  checkboxSelected: {
    backgroundColor: "#76C26A",
    borderColor: "#76C26A",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 18,
  },

  noneButton: {
    minHeight: 56,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: "#8FA8D9",
    marginTop: 4,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  noneButtonSelected: {
    backgroundColor: "#EAF1FF",
    borderColor: "#4E82DA",
  },

  noneButtonInner: {
    flexDirection: "row",
    alignItems: "center",
  },

  noneTextWrap: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 10,
  },

  noneButtonText: {
    color: "#5575A8",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },

  noneButtonTextSelected: {
    color: "#3C5B8A",
  },
});