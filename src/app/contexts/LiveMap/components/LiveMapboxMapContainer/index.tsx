"use client";

import useSWR from "swr";
import 'mapbox-gl/dist/mapbox-gl.css';

import { MapboxPublicConfigService } from "@/utils/ApiClientFactory";
import { LiveMapboxMap } from "./LiveMapboxMap";

// useMapbox is designed to accept MapboxPublicConfig from MapboxPublicConfigService
// Container component is designed to handle success, loading, and error render states and nothing else
export function LiveMapboxMapContainer() {
    const mapboxPublicConfigService = new MapboxPublicConfigService();
    const { data, error, isLoading } = useSWR('mbConfigCacheKey', async () => mapboxPublicConfigService.findAll(), { refreshInterval: 20000 });

    if (error) return <div>mapbox config load error</div>;
    if (isLoading) return <div>mapbox config loading...</div>;
    if (!data || data.length === 0 || !data[0]) return <div>no mapbox config</div>;

    return <LiveMapboxMap publicKey={data[0].publicKey} startLng={data[0].startLng} startLat={data[0].startLat} zoomLevel={data[0].zoomLevel} />
}
