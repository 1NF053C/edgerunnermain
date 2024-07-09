import React from 'react';
import { useMapbox } from "./hooks/useMapbox";
import { useMapboxNavigation } from "./hooks/useMapboxNavigation";
import { useMapboxPulsingMarker } from "./hooks/useMapboxPulsingMarker";
import 'mapbox-gl/dist/mapbox-gl.css';
export function MapboxMap(props) {
    if (!props)
        throw 'MapboxMap props must be initialized in parent container';
    var _a = useMapbox(props), mapRef = _a.mapRef, mapContainerRef = _a.mapContainerRef;
    useMapboxNavigation(mapRef);
    useMapboxPulsingMarker(mapRef, { lng: props.startLng, lat: props.startLat });
    return React.createElement("div", { style: { height: '100%', width: '100%' }, ref: mapContainerRef, className: "map-container" });
}
