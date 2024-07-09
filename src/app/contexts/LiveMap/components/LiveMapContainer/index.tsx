"use client";

import { useMapbox } from "../../hooks/useMapbox";

import { MapboxPublicConfigService } from "@/utils/ApiClientFactory";
import useSWR from "swr";
const mapboxPublicConfigService = new MapboxPublicConfigService();

export function LiveMapContainer() {
    const { data, error, isLoading } = useSWR('mbConfigCacheKey', mapboxPublicConfigService.findAll, { refreshInterval: 5000 })

    if (error) return <div>error</div>;
    if (isLoading) return <div>loading...</div>;
    if (!data) return <div>no data</div>;

    const { mapRef, MapContainer } = useMapbox({
        publicKey: data[0].publicKey,
        startLng: data[0].startLng,
        startLat: data[0].startLat,
        zoomLevel: data[0].zoomLevel
    });

    return (
        <div>
            OK
        </div>
    )
}
