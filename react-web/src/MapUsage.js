import React from "react";
import MapLeaflet from "mapleaflet-react-web-native";
/* import { Circle } from "react-leaflet";
 */
import "./App.css";

const MapUsage = () => {
  /*   const center = [51.505, -0.09];

  const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ];

  const multiPolyline = [
    [
      [51.5, -0.1],
      [51.5, -0.12],
      [51.52, -0.12],
    ],
    [
      [51.5, -0.05],
      [51.5, -0.06],
      [51.52, -0.06],
    ],
  ];

  const polygon = [
    [51.515, -0.09],
    [51.52, -0.1],
    [51.52, -0.12],
  ];

  const multiPolygon = [
    [
      [51.51, -0.12],
      [51.51, -0.13],
      [51.53, -0.13],
    ],
    [
      [51.51, -0.05],
      [51.51, -0.07],
      [51.53, -0.07],
    ],
  ];

  const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];

  const fillBlueOptions = { fillColor: "blue" };
  const blackOptions = { color: "black" };
  const limeOptions = { color: "lime" };
  const purpleOptions = { color: "purple" };
  const redOptions = { color: "red" }; */
  return (
    <div className="App" data-testid="mapl">
      <MapLeaflet
      /*  children={
          <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
        } */
      />
    </div>
  );
};

export default MapUsage;
