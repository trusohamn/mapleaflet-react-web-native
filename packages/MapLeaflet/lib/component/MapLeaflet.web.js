import React, { useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, } from "react-leaflet";
import "../assets/MapLeaflet.css";
import { Icon } from "leaflet";
import { useMapLeaflet } from "../hooks";
const LocationSelector = ({ setSelectedPosition, selectedPosition, selectorIconWithDefault, }) => {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker != null) {
                setSelectedPosition(marker.getLatLng());
            }
        },
    }), []);
    useMapEvents({
        click: (e) => setSelectedPosition(e.latlng),
    });
    return (React.createElement(Marker, { draggable: true, eventHandlers: eventHandlers, position: selectedPosition, ref: markerRef, icon: new Icon({
            iconUrl: selectorIconWithDefault,
            iconSize: [32, 42],
        }) },
        React.createElement(Popup, { minWidth: 90 },
            React.createElement("span", null, "Drag marker to mark position"))));
};
const MapLeaflet = ({ markers = [], zoom: zoomSetting, position: positionSetting, locationSelector, }) => {
    const { mapCenterPosition, zoom, selectorIconWithDefault } = useMapLeaflet({
        zoomSetting,
        positionSetting,
        selectorIcon: locationSelector === null || locationSelector === void 0 ? void 0 : locationSelector.selectorIcon,
    });
    return (React.createElement(MapContainer, { center: mapCenterPosition, zoom: zoom },
        React.createElement(TileLayer, { attribution: '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png" }),
        markers.map((marker) => {
            return (React.createElement(Marker, { key: JSON.stringify({
                    position: marker.position,
                    name: marker.name,
                }), position: marker.position, icon: new Icon({
                    iconUrl: marker.icon || " ",
                    iconSize: marker.size,
                }) },
                React.createElement(Popup, null,
                    marker.name,
                    " ",
                    React.createElement("br", null))));
        }),
        !!locationSelector && (React.createElement(LocationSelector, { selectorIconWithDefault: selectorIconWithDefault, selectedPosition: locationSelector.selectedPosition, setSelectedPosition: locationSelector.setSelectedPosition }))));
};
export default MapLeaflet;
