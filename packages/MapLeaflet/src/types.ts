export type LatLngObject = { lat: number; lng: number };

export type MarkerObject = {
  id: string;
  position: LatLngObject;
  icon: string;
  size: [number, number];
  name: string;
  Popup: React.FC<any>;
};

export type MapLeafletProps = {
  markers?: MarkerObject[];
  zoom?: number;
  position?: LatLngObject;
  locationSelector?: {
    selectedPosition?: LatLngObject;
    setSelectedPosition: (arg: LatLngObject) => void;
    selectorIcon?: any;
  };
};
