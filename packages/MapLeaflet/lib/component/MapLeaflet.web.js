import React, { createRef, useRef, useMemo, useState, } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/MapLeaflet.css";
import { Icon } from "leaflet";
import { useMapLeaflet } from "../hooks";
const MapLeaflet = ({ markers = [], zoom: zoomSetting, position: positionSetting, selectedPosition, setSelectedPosition, markerIcon, children, ...props }) => {
    const { mapCenterPosition, zoom, markerIconWithDefault } = useMapLeaflet({
        zoomSetting,
        positionSetting,
        markerIcon,
    });
    const refmarker = createRef();
    /*   const updatePosition = () => {
      if (refmarker.current != null && !!setSelectedPosition) {
        setSelectedPosition(refmarker.current.leafletElement.getLatLng());
      }
    }; */
    const center = {
        lat: 59.3325,
        lng: 18.0649,
    };
    function DraggableMarker() {
        const [position, setPosition] = useState(selectedPosition || center);
        const markerRef = useRef(null);
        const eventHandlers = useMemo(() => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }), []);
        return (React.createElement(Marker, { draggable: true, eventHandlers: eventHandlers, position: position, ref: markerRef, icon: new Icon({
                iconUrl: markerIcon || markerIconWithDefault,
                iconSize: [32, 42],
            }) },
            React.createElement(Popup, { minWidth: 90 },
                React.createElement("span", null, " \"Marker is draggable\""))));
    }
    return (React.createElement(MapContainer, { center: mapCenterPosition, zoom: zoom },
        React.createElement(TileLayer, { attribution: '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png" }),
        markers.map((marker, id) => {
            return (React.createElement(Marker, { key: id, position: marker.position, icon: new Icon({
                    iconUrl: marker.icon || " ",
                    iconSize: marker.size,
                }) },
                React.createElement(Popup, null,
                    marker.name,
                    " ",
                    React.createElement("br", null))));
        }),
        React.createElement(DraggableMarker, null)));
};
export default MapLeaflet;
