import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapLeaflet from "mapleaflet-react-web-native";

const markers = [
  {
    id: "1",
    position: { lat: 59.5, lng: 18.0 },
    size: [32, 32],
    Popup: null,
  },
  {
    id: "2",
    position: { lat: 59.56, lng: 18.0 },
    size: [32, 32],
    Popup: () => <Text>Hello!</Text>,
  },
  {
    id: "3",
    position: { lat: 59.59, lng: 18.0 },
    size: [32, 32],
    Popup: null,
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <MapLeaflet markers={markers} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
