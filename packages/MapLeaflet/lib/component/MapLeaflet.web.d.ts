/// <reference types="react" />
import "../assets/MapLeaflet.css";
import { MapLeafletProps } from "../types";
declare const MapLeaflet: ({ markers, zoom: zoomSetting, position: positionSetting, selectedPosition, setSelectedPosition, markerIcon, children, ...props }: MapLeafletProps) => JSX.Element;
export default MapLeaflet;