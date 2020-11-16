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
    lat: 51.505,
    lng: -0.09,
  };
  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(selectedPosition || center);
    const markerRef = useRef<any>(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }

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
      {/*       {!!selectedPosition && (
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
          {...props}
        ></Marker>
      )} */}
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
      <DraggableMarker />
    </MapContainer>
  );
};

export default MapLeaflet;
