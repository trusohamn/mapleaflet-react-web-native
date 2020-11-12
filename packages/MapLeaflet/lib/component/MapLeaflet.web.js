import React, { createRef } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "../MapLeaflet.css";
import { Icon } from "leaflet";
import { useMapLeaflet } from "../hooks";
const MapLeaflet = ({ markers = [], zoom: zoomSetting, position: positionSetting, selectedPosition, setSelectedPosition, markerIcon, }) => {
    const { mapCenterPosition, zoom } = useMapLeaflet({
        zoomSetting,
        positionSetting,
    });
    const refmarker = createRef();
    const updatePosition = () => {
        if (refmarker.current != null && !!setSelectedPosition) {
            setSelectedPosition(refmarker.current.leafletElement.getLatLng());
        }
    };
    return (React.createElement(LeafletMap, { center: mapCenterPosition, zoom: zoom, onclick: (e) => !!setSelectedPosition && setSelectedPosition(e.latlng) },
        React.createElement(TileLayer, { attribution: '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png" }),
        !!selectedPosition && (React.createElement(Marker, { position: selectedPosition, draggable: true, ondragend: updatePosition, ref: refmarker, icon: new Icon({
                iconUrl: markerIcon || " ",
                iconSize: [32, 42],
            }) })),
        markers.map((marker, id) => {
            return (React.createElement(Marker, { key: id, position: marker.position, icon: new Icon({
                    iconUrl: marker.icon || " ",
                    iconSize: marker.size,
                }) },
                React.createElement(Popup, null,
                    marker.name,
                    " ",
                    React.createElement("br", null))));
        })));
};
export default MapLeaflet;
