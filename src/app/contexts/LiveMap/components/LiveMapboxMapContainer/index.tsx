"use client";

import useSWR from "swr";
import 'mapbox-gl/dist/mapbox-gl.css';

import { MapboxPublicConfigService } from "@/utils/ApiClientFactory";
import { useMapbox } from "../../hooks/useMapbox";
import { useMapboxNavigation } from "../../hooks/useMapboxNavigation";

export interface LiveMapboxMapProps {
    publicKey: string,
    startLng: number,
    startLat: number,
    zoomLevel: number
}

export function LiveMapboxMapContainer() {
    const mapboxPublicConfigService = new MapboxPublicConfigService();
    const { data, error, isLoading } = useSWR('mbConfigCacheKey', async () => mapboxPublicConfigService.findAll(), { refreshInterval: 20000 });

    if (error) return <div>error</div>;
    if (isLoading) return <div>loading...</div>;
    if (!data || data.length === 0 || !data[0]) return <div>no data</div>;

    return <LiveMapboxMap publicKey={data[0].publicKey} startLng={data[0].startLng} startLat={data[0].startLat} zoomLevel={data[0].zoomLevel} />
}

function LiveMapboxMap(props: LiveMapboxMapProps) {
    if (!props) throw 'LiveMapboxMap props must be initialized in parent container';

    const { mapRef, mapContainerRef } = useMapbox(props);
    useMapboxNavigation(mapRef);

    return <div
        style={{ height: '100%', width: '100%' }}
        ref={mapContainerRef}
        className="map-container"
    />
}
