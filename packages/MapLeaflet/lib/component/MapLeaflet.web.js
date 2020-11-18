import React, { createRef, useRef, useMemo, } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/MapLeaflet.css";
import { Icon } from "leaflet";
import { useMapLeaflet } from "../hooks";
const DraggableMarker = ({ setSelectedPosition, selectedPosition, markerIconWithDefault, }) => {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker != null) {
                setSelectedPosition(marker.getLatLng());
            }
        },
    }), []);
    return (React.createElement(Marker, { draggable: true, eventHandlers: eventHandlers, position: selectedPosition, ref: markerRef, icon: new Icon({
            iconUrl: markerIconWithDefault,
            iconSize: [32, 42],
        }) },
        React.createElement(Popup, { minWidth: 90 },
            React.createElement("span", null, "Drag marker to mark position"))));
};
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
    console.log(markerIconWithDefault, selectedPosition, setSelectedPosition);
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
        React.createElement(DraggableMarker, { markerIconWithDefault: markerIconWithDefault, selectedPosition: selectedPosition, setSelectedPosition: setSelectedPosition })));
};
export default MapLeaflet;
