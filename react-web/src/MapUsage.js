import React, { useState } from "react";
import MapLeaflet from "mapleaflet-react-web-native";
import "./App.css";

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
      />
    </div>
  );
};

export default MapUsage;
