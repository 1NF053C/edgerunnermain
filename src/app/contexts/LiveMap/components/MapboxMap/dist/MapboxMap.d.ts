import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
export interface MapboxMapProps {
    publicKey: string;
    startLng: number;
    startLat: number;
    zoomLevel: number;
}
export declare function MapboxMap(props: MapboxMapProps): React.JSX.Element;
