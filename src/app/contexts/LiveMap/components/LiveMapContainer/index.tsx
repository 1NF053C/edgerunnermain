"use client";
import { MutableRefObject, useEffect, useRef } from "react";
import useSWR from "swr";

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MapboxPublicConfigService } from "@/utils/ApiClientFactory";

export interface UseMapboxProps {
    publicKey: string,
    startLng: number,
    startLat: number,
    zoomLevel: number
}

function useMapbox(props: UseMapboxProps) {
    if (!props) throw 'MapVisualization props.data has to be initialized to a nonnull value in its parent container.';

    const mapContainerRef = useRef<any>();
    const mapRef = useRef<any>();

    useEffect(() => {
        if (mapRef.current) return;
        mapboxgl.accessToken = props.publicKey;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [props.startLng, props.startLat],
            zoom: props.zoomLevel
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return { mapContainerRef, mapRef }
}

function useMapboxNavigation(mapRef: MutableRefObject<any>) {
    useEffect(() => {
        if (!mapRef.current) return;
        const navControl = new mapboxgl.NavigationControl();
        mapRef.current.addControl(navControl, 'top-right');
    }, [mapRef])
}

function LiveMap(props: UseMapboxProps) {
    if (!props) throw 'ERR: LiveMap received invalid props';

    const { mapRef, mapContainerRef } = useMapbox(props);
    useMapboxNavigation(mapRef);

    return <div
        style={{ height: '100%', width: '100%' }}
        ref={mapContainerRef}
        className="map-container"
    />
}

export function LiveMapContainer() {
    const mapboxPublicConfigService = new MapboxPublicConfigService();
    const { data, error, isLoading } = useSWR('mbConfigCacheKey', async () => mapboxPublicConfigService.findAll(), { refreshInterval: 20000 });

    if (error) return <div>error</div>;
    if (isLoading) return <div>loading...</div>;
    if (!data || data.length === 0 || !data[0]) return <div>no data</div>;

    return <LiveMap publicKey={data[0].publicKey} startLng={data[0].startLng} startLat={data[0].startLat} zoomLevel={data[0].zoomLevel} />
}
