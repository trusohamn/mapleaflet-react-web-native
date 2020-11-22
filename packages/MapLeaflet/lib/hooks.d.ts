/// <reference types="react" />
import { LatLngObject } from "./types";
export declare const useMapLeaflet: ({ zoomSetting, positionSetting, selectorIcon, }: {
    zoomSetting?: number | undefined;
    positionSetting?: LatLngObject | undefined;
    selectorIcon?: any;
}) => {
    mapCenterPosition: LatLngObject;
    setMapCenterPosition: import("react").Dispatch<import("react").SetStateAction<LatLngObject>>;
    zoom: number;
    setZoom: import("react").Dispatch<import("react").SetStateAction<number>>;
    selectorIconWithDefault: any;
};
