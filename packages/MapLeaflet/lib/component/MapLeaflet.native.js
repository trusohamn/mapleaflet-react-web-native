import React, { useState } from "react";
import { WebViewLeaflet, WebViewLeafletEvents, } from "@trusohamn/react-native-webview-leaflet";
import { View, Alert, Image } from "react-native";
import { useMapLeaflet } from "../hooks";
import styles from "../style";
const MapLeaflet = ({ markers = [], zoom: zoomSetting, position: positionSetting, locationSelector, }) => {
    const { mapCenterPosition, zoom, selectorIconWithDefault } = useMapLeaflet({
        zoomSetting,
        positionSetting,
        selectorIcon: locationSelector === null || locationSelector === void 0 ? void 0 : locationSelector.selectorIcon,
    });
    const [webViewLeafletRef, setWebViewLeafletRef,] = useState(null);
    const onMessageReceived = (message) => {
        var _a, _b, _c;
        switch (message.event) {
            case WebViewLeafletEvents.ON_MAP_TOUCHED:
                const position = (_a = message === null || message === void 0 ? void 0 : message.payload) === null || _a === void 0 ? void 0 : _a.touchLatLng;
                locationSelector === null || locationSelector === void 0 ? void 0 : locationSelector.setSelectedPosition(position);
                break;
            case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
                Alert.alert(` ${((_b = message === null || message === void 0 ? void 0 : message.payload) === null || _b === void 0 ? void 0 : _b.mapMarkerID) ? markers[parseInt((_c = message === null || message === void 0 ? void 0 : message.payload) === null || _c === void 0 ? void 0 : _c.mapMarkerID, 10) - 1].name
                    : "unknown"}`);
                break;
        }
    };
    const setMarkersOnMap = () => {
        const locationMarkers = markers.map((marker) => {
            return Object.assign(Object.assign({}, marker), { icon: Image.resolveAssetSource(marker.icon || 0).uri });
        });
        if (!!locationSelector) {
            locationMarkers.push({
                id: "selectedMarker",
                icon: Image.resolveAssetSource(selectorIconWithDefault).uri,
                position: locationSelector.selectedPosition,
                size: [32, 42],
                name: "selectedMarker",
            });
        }
        return locationMarkers;
    };
    return (React.createElement(View, { style: styles.container },
        React.createElement(WebViewLeaflet, { onMessageReceived: onMessageReceived, ref: (ref) => {
                setWebViewLeafletRef(ref);
            }, mapLayers: [
                {
                    attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    baseLayerIsChecked: true,
                    baseLayerName: "OpenStreetMap.Mapnik",
                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                },
            ], mapMarkers: setMarkersOnMap(), mapCenterPosition: mapCenterPosition, zoom: zoom })));
};
export default MapLeaflet;
