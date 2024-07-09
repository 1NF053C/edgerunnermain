import { useMapbox } from "../../hooks/useMapbox";
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation";

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

    return <div
        style={{ height: '100%', width: '100%' }}
        ref={mapContainerRef}
        className="map-container"
    />
}
