import React, { useState } from "react";
import { WebViewLeaflet, WebViewLeafletEvents, } from "@trusohamn/react-native-webview-leaflet";
import { View, Image, Modal, TouchableHighlight, Text, } from "react-native";
import { useMapLeaflet } from "../hooks";
import styles from "../style";
const MapLeaflet = ({ markers = [], zoom: zoomSetting, position: positionSetting, locationSelector, }) => {
    var _a;
    const [modalVisible, setModalVisible] = useState(false);
    const [mapMarkerId, setMapMarkerId] = useState(0);
    const { mapCenterPosition, zoom, selectorIconWithDefault } = useMapLeaflet({
        zoomSetting,
        positionSetting,
        selectorIcon: locationSelector === null || locationSelector === void 0 ? void 0 : locationSelector.selectorIcon,
    });
    const [webViewLeafletRef, setWebViewLeafletRef,] = useState(null);
    const onMessageReceived = (message) => {
        var _a, _b;
        switch (message.event) {
            case WebViewLeafletEvents.ON_MAP_TOUCHED:
                const position = (_a = message === null || message === void 0 ? void 0 : message.payload) === null || _a === void 0 ? void 0 : _a.touchLatLng;
                locationSelector === null || locationSelector === void 0 ? void 0 : locationSelector.setSelectedPosition(position);
                break;
            case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
                setModalVisible(true);
                setMapMarkerId(parseInt(((_b = message === null || message === void 0 ? void 0 : message.payload) === null || _b === void 0 ? void 0 : _b.mapMarkerID) || "0", 10) - 1);
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
    const CustomPopup = (_a = markers[mapMarkerId]) === null || _a === void 0 ? void 0 : _a.Popup;
    return (React.createElement(View, { style: styles.container },
        React.createElement(View, { style: styles.centeredView },
            React.createElement(Modal, { animationType: "slide", transparent: true, visible: modalVisible },
                React.createElement(View, { style: styles.centeredView },
                    React.createElement(View, { style: styles.modalView },
                        !!CustomPopup && React.createElement(CustomPopup, null),
                        React.createElement(TouchableHighlight, { style: Object.assign(Object.assign({}, styles.openButton), { backgroundColor: "#2196F3" }), onPress: () => {
                                setModalVisible(false);
                            } },
                            React.createElement(Text, { style: styles.textStyle }, "Close")))))),
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
