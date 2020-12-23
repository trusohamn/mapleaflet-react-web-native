import React, { useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "../assets/MapLeaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroupWrongType from "react-leaflet-markercluster";
require("leaflet/dist/leaflet.css");
require("react-leaflet-markercluster/dist/styles.min.css");

import { useMapLeaflet } from "../hooks";
import { MapLeafletProps } from "../types";

const LocationSelector = ({
  setSelectedPosition,
  selectedPosition,
  selectorIconWithDefault,
}: {
  setSelectedPosition: any;
  selectedPosition: any;
  selectorIconWithDefault: any;
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
  useMapEvents({
    click: (e) => setSelectedPosition(e.latlng),
  });
  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={selectedPosition}
      ref={markerRef}
      icon={
        new Icon({
          iconUrl: selectorIconWithDefault,
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
  locationSelector,
}: MapLeafletProps) => {
  const { mapCenterPosition, zoom, selectorIconWithDefault } = useMapLeaflet({
    zoomSetting,
    positionSetting,
    selectorIcon: locationSelector?.selectorIcon,
  });
  const MarkerClusterGroup: any = MarkerClusterGroupWrongType;
  return (
    <MapContainer center={mapCenterPosition} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {markers.map((marker) => {
          const CustomPopup = marker.Popup;
          return (
            <Marker
              key={JSON.stringify({
                position: marker.position,
                name: marker.name,
              })}
              position={marker.position}
              icon={
                new Icon({
                  iconUrl: marker.icon || " ",
                  iconSize: marker.size,
                })
              }
            >
              <Popup>
                <CustomPopup />
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
      {!!locationSelector && (
        <LocationSelector
          selectorIconWithDefault={selectorIconWithDefault}
          selectedPosition={locationSelector.selectedPosition}
          setSelectedPosition={locationSelector.setSelectedPosition}
        />
      )}
    </MapContainer>
  );
};

export default MapLeaflet;
