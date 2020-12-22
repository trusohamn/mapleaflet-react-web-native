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
  const [modalVisible, setModalVisible] = useState(true);
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
        Alert.alert(
          ` ${
            message?.payload?.mapMarkerID
              ? markers[parseInt(message?.payload?.mapMarkerID, 10) - 1].name
              : "unknown"
          }`
        );

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

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View>
          <Text>Hello World!</Text>
          <TouchableHighlight
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </Modal>
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
