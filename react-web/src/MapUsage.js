import React, { useState } from "react";
import MapLeaflet from "mapleaflet-react-web-native";
import "./App.css";
import icon from "./icon.png";

const markers = [
  {
    id: "1",
    position: { lat: 59.5, lng: 18.0 },
    icon,
    size: [32, 32],
  },
  {
    id: "2",
    position: { lat: 59.56, lng: 18.0 },
    icon,
    size: [32, 32],
  },
  {
    id: "3",
    position: { lat: 59.59, lng: 18.0 },
    icon,
    size: [32, 32],
  },
];

const MapUsage = () => {
  const [selectedPosition, setSelectedPosition] = useState({
    lat: 59.5,
    lng: 18.0,
  });
  return (
    <div className="App" data-testid="mapl">
      <MapLeaflet
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        markers={markers}
      />
    </div>
  );
};

export default MapUsage;
