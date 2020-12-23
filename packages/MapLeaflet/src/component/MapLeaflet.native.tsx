import React, { useState } from "react";
import {
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
} from "@trusohamn/react-native-webview-leaflet";
import {
  View,
  Alert,
  Image,
  Modal,
  TouchableHighlight,
  Text,
} from "react-native";
import { useMapLeaflet } from "../hooks";
import { LatLngObject, MapLeafletProps } from "../types";
import styles from "../style";

const MapLeaflet = ({
  markers = [],
  zoom: zoomSetting,
  position: positionSetting,
  locationSelector,
}: MapLeafletProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mapMarkerId, setMapMarkerId] = useState(0);
  const { mapCenterPosition, zoom, selectorIconWithDefault } = useMapLeaflet({
    zoomSetting,
    positionSetting,
    selectorIcon: locationSelector?.selectorIcon,
  });
  const [
    webViewLeafletRef,
    setWebViewLeafletRef,
  ] = useState<WebViewLeaflet | null>(null);

  const onMessageReceived = (message: WebviewLeafletMessage) => {
    switch (message.event) {
      case WebViewLeafletEvents.ON_MAP_TOUCHED:
        const position = message?.payload?.touchLatLng as LatLngObject;
        locationSelector?.setSelectedPosition(position);
        break;
      case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
        setModalVisible(true);
        setMapMarkerId(parseInt(message?.payload?.mapMarkerID || "0", 10) - 1);
        break;
    }
  };

  const setMarkersOnMap = () => {
    const locationMarkers = markers.map((marker: any) => {
      return {
        ...marker,
        icon: Image.resolveAssetSource(marker.icon || 0).uri,
      };
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

  const CustomPopup = markers[mapMarkerId]?.Popup;
  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CustomPopup />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      <WebViewLeaflet
        onMessageReceived={onMessageReceived}
        ref={(ref: WebViewLeaflet) => {
          setWebViewLeafletRef(ref);
        }}
        mapLayers={[
          {
            attribution:
              '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            baseLayerIsChecked: true,
            baseLayerName: "OpenStreetMap.Mapnik",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          },
        ]}
        mapMarkers={setMarkersOnMap()}
        mapCenterPosition={mapCenterPosition}
        zoom={zoom}
      ></WebViewLeaflet>
    </View>
  );
};

export default MapLeaflet;
