/// <reference types="react" />
export declare type LatLngObject = {
    lat: number;
    lng: number;
};
export declare type MarkerObject = {
    id: string;
    position: LatLngObject;
    icon: string;
    size: [number, number];
    name: string;
    Popup?: React.FC<any>;
};
export declare type MapLeafletProps = {
    markers?: MarkerObject[];
    zoom?: number;
    position?: LatLngObject;
    locationSelector?: {
        selectedPosition?: LatLngObject;
        setSelectedPosition: (arg: LatLngObject) => void;
        selectorIcon?: any;
    };
};
