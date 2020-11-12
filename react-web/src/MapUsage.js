import React from "react";
import MapLeaflet from "mapleaflet-react-web-native";

import "./App.css";

const MapUsage = () => {
  return (
    <div className="App" data-testid="mapl">
      <MapLeaflet />
    </div>
  );
};

export default MapUsage;
