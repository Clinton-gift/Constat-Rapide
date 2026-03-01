// src/pages/HomeScreen.js
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Linking,
} from "react-native";

const nalicoreLogo = require("../../assets/nalicore_logo.png");

// ✅ API base
const API_BASE = "https://api.nalicore.com";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const isSmall = width < 420;
  const isMobile = width < 768;
  const isDesktop = width >= 1024;

  const containerMaxWidth = isDesktop ? 520 : isMobile ? 520 : "100%";

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ resolved data from API
  const [resolved, setResolved] = useState({
    quartier: "—",
    secteur: "—",
    sousSecteur: "—",
    entree: "—",
    lieu: "—",
    banoc: "—",
    latitude: null,
    longitude: null,
  });

  const canNavigate = useMemo(() => {
    return (
      typeof resolved.latitude === "number" &&
      typeof resolved.longitude === "number"
    );
  }, [resolved.latitude, resolved.longitude]);

  function mapApiToUi(json) {
    return {
      quartier: json?.quartier?.name ?? "—",
      secteur: json?.secteur?.name ?? "—",
      sousSecteur: json?.sous_secteur?.name ?? "—",
      entree: json?.entree?.name ?? "—",
      lieu: json?.lieu?.name ?? "—",
      banoc: json?.lieu?.banoc_code ?? "—",
      latitude:
        typeof json?.lieu?.gps?.lat === "number" ? json.lieu.gps.lat : null,
      longitude:
        typeof json?.lieu?.gps?.lng === "number" ? json.lieu.gps.lng : null,
    };
  }

  const onResolve = async () => {
    const q = (query ?? "").trim();
    setErrorMsg("");

    if (!q) {
      setErrorMsg("Please type something to search.");
      return;
    }

    setLoading(true);
    try {
      const url = `${API_BASE}/${encodeURIComponent(q)}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      let data = null;
      try {
        data = await res.json();
      } catch (_) {
        data = null;
      }

      if (!res.ok) {
        setErrorMsg(data?.message || "Could not resolve this address.");
        return;
      }

      if (!data?.ok) {
        setErrorMsg("No match found.");
        return;
      }

      setResolved(mapApiToUi(data));
    } catch (e) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onNavigate = async () => {
    if (!canNavigate) return;

    const lat = resolved.latitude;
    const lng = resolved.longitude;

    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

    try {
      if (Platform.OS === "web") {
        window.open(mapsUrl, "_blank");
        return;
      }
      const supported = await Linking.canOpenURL(mapsUrl);
      if (supported) await Linking.openURL(mapsUrl);
    } catch (_) {}
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <View style={[styles.container, { maxWidth: containerMaxWidth }]}>
          {/* Header (DO NOT TOUCH) */}
          <View style={styles.headerArea}>
            <View style={styles.headerRow}>
              <Image
                source={nalicoreLogo}
                style={[styles.logo, { width: isSmall ? 165 : 195 }]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.tagline,
                  {
                    fontSize: isSmall ? 14 : 15,
                    lineHeight: isSmall ? 19 : 20,
                  },
                ]}
                numberOfLines={2}
              >
                Natural Address{"\n"}Location Infrastructure
              </Text>
            </View>
          </View>

          <View style={styles.body}>
            {/* Search + Resolve */}
            <View style={styles.searchOuter}>
              <View style={styles.searchBar}>
                <View style={styles.searchLeft}>
                  <Text style={styles.searchIcon}>⌕</Text>

                  <TextInput
                    value={query}
                    onChangeText={setQuery}
                    style={[
                      styles.searchInput,
                      {
                        fontSize: isSmall ? 16 : 17,
                        lineHeight: isSmall ? 22 : 24,
                      },
                    ]}
                    placeholder="Search"
                    placeholderTextColor="rgba(15,23,42,0.25)"
                    multiline={false}
                    scrollEnabled={false}
                    textAlignVertical="center"
                    underlineColorAndroid="transparent"
                    returnKeyType="search"
                    onSubmitEditing={onResolve}
                    editable={!loading}
                  />
                </View>

                <View style={styles.searchDivider} />

                <TouchableOpacity
                  activeOpacity={0.92}
                  style={[
                    styles.resolveBtn,
                    {
                      width: isSmall ? 126 : 142,
                      height: 62,
                      opacity: loading ? 0.75 : 1,
                    },
                  ]}
                  onPress={onResolve}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.resolveText,
                      { fontSize: isSmall ? 17 : 18 },
                    ]}
                  >
                    {loading ? "Resolving…" : "Resolve"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

            {/* Card */}
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { fontSize: isSmall ? 20 : 22 }]}>
                Resolved Address
              </Text>

              <Row label="Quartier:" value={resolved.quartier} isSmall={isSmall} />
              <Row label="Secteur:" value={resolved.secteur} isSmall={isSmall} />
              <Row
                label="Sous-secteur:"
                value={resolved.sousSecteur}
                isSmall={isSmall}
              />
              <Row label="Entrée:" value={resolved.entree} isSmall={isSmall} />
              <Row label="Lieu:" value={resolved.lieu} isSmall={isSmall} />

              <View style={[styles.row, styles.rowBanoc]}>
                <Text style={[styles.label, { fontSize: isSmall ? 14 : 15 }]}>
                  BANOC:
                </Text>
                <View style={styles.banocPill}>
                  <Text style={styles.banocText}>{resolved.banoc}</Text>
                </View>
              </View>

              <Row
                label="Latitude:"
                value={
                  typeof resolved.latitude === "number"
                    ? resolved.latitude.toFixed(5)
                    : "—"
                }
                isSmall={isSmall}
              />
              <Row
                label="Longitude:"
                value={
                  typeof resolved.longitude === "number"
                    ? resolved.longitude.toFixed(5)
                    : "—"
                }
                isSmall={isSmall}
              />

              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.navBtn, { opacity: canNavigate ? 1 : 0.6 }]}
                onPress={onNavigate}
                disabled={!canNavigate}
              >
                <View style={styles.pinWrap}>
                  <LocationPinIcon />
                </View>

                <Text style={[styles.navText, { fontSize: isSmall ? 18 : 19 }]}>
                  Navigate to Location
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

/**
 * ✅ UPDATED: values now WRAP (no truncation)
 */
function Row({ label, value, isSmall }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { fontSize: isSmall ? 14 : 15 }]}>{label}</Text>

      <Text style={[styles.value, { fontSize: isSmall ? 15 : 16 }]}>
        {value}
      </Text>
    </View>
  );
}

function LocationPinIcon() {
  return (
    <View style={styles.locPin}>
      <View style={styles.locPinHead} />
      <View style={styles.locPinHole} />
      <View style={styles.locPinPoint} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E9ECF6" },

  page: {
    flex: 1,
    alignItems: "center",
    paddingTop: 0,
    paddingHorizontal: 0,
  },

  container: {
    width: "100%",
    paddingHorizontal: 0,
    paddingTop: 0,
  },

  headerArea: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 0,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderBottomWidth: 1,
    borderColor: "rgba(15,23,42,0.06)",
    marginBottom: 12,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  logo: { height: 48 },

  tagline: {
    textAlign: "right",
    color: "rgba(15, 23, 42, 0.65)",
    fontWeight: "500",
    maxWidth: 240,
  },

  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },

  /* SEARCH */
  searchOuter: {
    borderRadius: 18,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#1E2A4A",
        shadowOpacity: 0.10,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 14 },
      },
      android: { elevation: 3 },
    }),
  },

  searchBar: {
    width: "100%",
    height: 74,
    borderRadius: 18,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.78)",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
    alignItems: "center",
  },

  searchLeft: {
    flex: 1,
    minWidth: 0,
    paddingLeft: 60,
    paddingRight: 12,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.86)",
    height: "100%",
  },

  searchIcon: {
    position: "absolute",
    left: 16,
    top: 22,
    fontSize: 30,
    color: "rgba(15, 23, 42, 0.32)",
  },

  searchInput: {
    minWidth: 0,
    fontWeight: "600",
    color: "#0F172A",
    paddingVertical: 0,
    height: "100%",
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : null),
  },

  searchDivider: { width: 1, backgroundColor: "rgba(15,23,42,0.10)" },

  resolveBtn: {
    backgroundColor: "#2E59B7",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },

  resolveText: {
    color: "#FFFFFF",
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  errorText: {
    marginTop: -4,
    marginBottom: 10,
    color: "rgba(220,38,38,0.95)",
    fontWeight: "600",
  },

  /* CARD */
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.65)",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.08)",
    padding: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 14 },
      },
      android: { elevation: 3 },
    }),
  },

  cardTitle: {
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  /**
   * ✅ UPDATED ROW: allow wrapping for long values
   */
  row: {
    flexDirection: "row",
    alignItems: "flex-start", // ✅ top-align when value wraps
    marginBottom: 10,
    gap: 10,
  },

  label: {
    width: 120,
    flexShrink: 0, // ✅ label never collapses
    color: "rgba(15,23,42,0.55)",
    fontWeight: "500",
    paddingTop: 2, // optical align
  },

  value: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1, // ✅ allow wrap
    flexWrap: "wrap",
    color: "#0F172A",
    fontWeight: "600",
    lineHeight: 22,
  },

  // keeps BANOC pill aligned with wrapped rows
  rowBanoc: {
    alignItems: "center",
  },

  banocPill: {
    backgroundColor: "rgba(46,89,183,0.12)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(46,89,183,0.18)",
  },

  banocText: {
    color: "#2E59B7",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  navBtn: {
    marginTop: 14,
    borderRadius: 18,
    backgroundColor: "#2E59B7",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 14 },
      },
      android: { elevation: 5 },
    }),
  },

  navText: {
    color: "#FFFFFF",
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  pinWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },

  locPin: {
    width: 18,
    height: 22,
    alignItems: "center",
  },
  locPinHead: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  locPinHole: {
    position: "absolute",
    top: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2E59B7",
  },
  locPinPoint: {
    marginTop: -3,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFFFFF",
  },
});