import React, { createRef, useRef, useMemo, useState, useCallback, } from "react";
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
        lat: 51.505,
        lng: -0.09,
    };
    function DraggableMarker() {
        const [draggable, setDraggable] = useState(false);
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
        const toggleDraggable = useCallback(() => {
            setDraggable((d) => !d);
        }, []);
        return (React.createElement(Marker, { draggable: draggable, eventHandlers: eventHandlers, position: position, ref: markerRef },
            React.createElement(Popup, { minWidth: 90 },
                React.createElement("span", { onClick: toggleDraggable }, draggable
                    ? "Marker is draggable"
                    : "Click here to make marker draggable"))));
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
