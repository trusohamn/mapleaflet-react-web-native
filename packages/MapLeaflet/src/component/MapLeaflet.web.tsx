import React, { createRef } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/MapLeaflet.css";
import { Icon } from "leaflet";

import { useMapLeaflet } from "../hooks";
import { MapLeafletProps } from "../types";

const MapLeaflet = ({
  markers = [],
  zoom: zoomSetting,
  position: positionSetting,
  selectedPosition,
  setSelectedPosition,
  markerIcon,
}: MapLeafletProps) => {
  const { mapCenterPosition, zoom, markerIconWithDefault } = useMapLeaflet({
    zoomSetting,
    positionSetting,
    markerIcon,
  });

  const refmarker = createRef<Marker>();

  const updatePosition = () => {
    if (refmarker.current != null && !!setSelectedPosition) {
      setSelectedPosition(refmarker.current.leafletElement.getLatLng());
    }
  };

  return (
    <LeafletMap
      center={mapCenterPosition}
      zoom={zoom}
      onclick={(e) => !!setSelectedPosition && setSelectedPosition(e.latlng)}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {!!selectedPosition && (
        <Marker
          position={selectedPosition}
          draggable={true}
          ondragend={updatePosition}
          ref={refmarker}
          icon={
            new Icon({
              iconUrl: markerIcon || markerIconWithDefault,
              iconSize: [32, 42],
            })
          }
        ></Marker>
      )}
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
    </LeafletMap>
  );
};

export default MapLeaflet;
