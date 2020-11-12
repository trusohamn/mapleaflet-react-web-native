import React, { useState } from "react";
import { WebViewLeaflet, WebViewLeafletEvents, } from "@trusohamn/react-native-webview-leaflet";
import { View, Alert, Image } from "react-native";
import { useMapLeaflet } from "../hooks";
import styles from "../style";
const MapLeaflet = ({ markers = [], zoom: zoomSetting, position: positionSetting, selectedPosition, setSelectedPosition, markerIcon, }) => {
    const { mapCenterPosition, zoom } = useMapLeaflet({
        zoomSetting,
        positionSetting,
    });
    const [webViewLeafletRef, setWebViewLeafletRef,] = useState(null);
    const onMessageReceived = (message) => {
        switch (message.event) {
            case WebViewLeafletEvents.ON_MAP_TOUCHED:
                const position = message?.payload?.touchLatLng;
                !!setSelectedPosition && setSelectedPosition(position);
                break;
            case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
                Alert.alert(` ${message?.payload?.mapMarkerID
                    ? markers[parseInt(message?.payload?.mapMarkerID, 10) - 1].name
                    : "unknown"}`);
                break;
        }
    };
    const setMarkersOnMap = () => {
        const locationMarkers = markers.map((marker) => {
            return {
                ...marker,
                icon: Image.resolveAssetSource(marker.icon || 0).uri,
            };
        });
        if (!!selectedPosition) {
            locationMarkers.push({
                id: "selectedMarker",
                icon: Image.resolveAssetSource(markerIcon || 0).uri,
                position: selectedPosition,
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
