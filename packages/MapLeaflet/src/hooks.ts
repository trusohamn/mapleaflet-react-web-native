import { useState } from "react";
import { LatLngObject } from "./types";
import defaultMarkerIcon from "./assets/marker.png";

export const useMapLeaflet = ({
  zoomSetting,
  positionSetting,
  markerIcon,
}: {
  zoomSetting?: number;
  positionSetting?: LatLngObject;
  markerIcon?: any;
}) => {
  const [mapCenterPosition, setMapCenterPosition] = useState(
    positionSetting || {
      lat: 59.5,
      lng: 18.0,
    }
  );

  const [zoom, setZoom] = useState(zoomSetting || 10);

  const markerIconWithDefault = markerIcon ? markerIcon : defaultMarkerIcon;

  return {
    mapCenterPosition,
    setMapCenterPosition,
    zoom,
    setZoom,
    markerIconWithDefault,
  };
};
