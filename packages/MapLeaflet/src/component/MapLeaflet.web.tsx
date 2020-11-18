import React, {
  createRef,
  useRef,
  useMemo,
  useState,
  useCallback,
} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/MapLeaflet.css";
import { Icon } from "leaflet";

import { useMapLeaflet } from "../hooks";
import { MapLeafletProps } from "../types";

const DraggableMarker = ({
  setSelectedPosition,
  selectedPosition,
  markerIconWithDefault,
}: {
  setSelectedPosition: any;
  selectedPosition: any;
  markerIconWithDefault: any;
}) => {
  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setSelectedPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={selectedPosition}
      ref={markerRef}
      icon={
        new Icon({
          iconUrl: markerIconWithDefault,
          iconSize: [32, 42],
        })
      }
    >
      <Popup minWidth={90}>
        <span>Drag marker to mark position</span>
      </Popup>
    </Marker>
  );
};

const MapLeaflet = ({
  markers = [],
  zoom: zoomSetting,
  position: positionSetting,
  selectedPosition,
  setSelectedPosition,
  markerIcon,
  children,
  ...props
}: MapLeafletProps) => {
  const { mapCenterPosition, zoom, markerIconWithDefault } = useMapLeaflet({
    zoomSetting,
    positionSetting,
    markerIcon,
  });

  const refmarker = createRef<typeof Marker>();

  /*   const updatePosition = () => {
    if (refmarker.current != null && !!setSelectedPosition) {
      setSelectedPosition(refmarker.current.leafletElement.getLatLng());
    }
  }; */
  const center = {
    lat: 59.3325,
    lng: 18.0649,
  };
  console.log(markerIconWithDefault, selectedPosition, setSelectedPosition);
  return (
    <MapContainer
      center={mapCenterPosition}
      zoom={zoom}
      /*       onclick={(e) => !!setSelectedPosition && setSelectedPosition(e.latlng)}
       */
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, id) => {
        return (
          <Marker
            key={id}
            position={marker.position}
            icon={
              new Icon({
                iconUrl: marker.icon || " ",
                iconSize: marker.size,
              })
            }
          >
            <Popup>
              {marker.name} <br />
            </Popup>
          </Marker>
        );
      })}
      {
        <DraggableMarker
          markerIconWithDefault={markerIconWithDefault}
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
        />
      }
    </MapContainer>
  );
};

export default MapLeaflet;
