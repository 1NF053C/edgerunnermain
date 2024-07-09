"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MapboxMapProps } from '../MapboxMap'

export function useMapbox(props: MapboxMapProps) {
    if (!props) throw 'useMapbox props has to be initialized to a nonnull value in its parent container.';

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
