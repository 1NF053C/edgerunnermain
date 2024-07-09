import React from 'react';
import { useMapbox } from "./hooks/useMapbox";
import { useMapboxNavigation } from "./hooks/useMapboxNavigation";
import { useMapboxPulsingMarker } from "./hooks/useMapboxPulsingMarker";
import 'mapbox-gl/dist/mapbox-gl.css';

export interface MapboxMapProps {
    publicKey: string,
    startLng: number,
    startLat: number,
    zoomLevel: number
}

export function MapboxMap(props: MapboxMapProps) {
    if (!props) throw 'MapboxMap props must be initialized in parent container';

    const { mapRef, mapContainerRef } = useMapbox(props);
    useMapboxNavigation(mapRef);
    useMapboxPulsingMarker(mapRef, { lng: props.startLng, lat: props.startLat })

    return <div
        style={{ height: '100%', width: '100%' }}
        ref={mapContainerRef}
        className="map-container"
    />
}
