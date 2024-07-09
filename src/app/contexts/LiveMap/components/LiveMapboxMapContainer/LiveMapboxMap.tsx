import { useMapbox } from "./hooks/views/useMapbox";
import { useMapboxNavigation } from "./hooks/views/useMapboxNavigation";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapboxPulsingMarker } from "./hooks/views/useMapboxPulsingMarker";


export interface LiveMapboxMapProps {
    publicKey: string,
    startLng: number,
    startLat: number,
    zoomLevel: number
}

export function LiveMapboxMap(props: LiveMapboxMapProps) {
    if (!props) throw 'LiveMapboxMap props must be initialized in parent container';

    const { mapRef, mapContainerRef } = useMapbox(props);
    useMapboxNavigation(mapRef);
    useMapboxPulsingMarker(mapRef, { lng: props.startLng, lat: props.startLat })

    return <div
        style={{ height: '100%', width: '100%' }}
        ref={mapContainerRef}
        className="map-container"
    />
}
