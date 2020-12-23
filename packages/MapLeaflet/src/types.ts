export type LatLngObject = { lat: number; lng: number };

export type MarkerObject = {
  id: string;
  position: LatLngObject;
  icon: string;
  size: [number, number];
  name: string;
  popup?: React.FC;
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
