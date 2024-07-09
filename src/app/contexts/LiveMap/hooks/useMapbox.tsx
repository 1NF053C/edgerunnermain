import { useRef, useEffect, Ref } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface UseMapboxProps {
    publicKey: string,
    startLng: number,
    startLat: number,
    zoomLevel: number
}

export function useMapbox({ publicKey, startLng, startLat, zoomLevel }: UseMapboxProps) {
    const mapContainerRef = useRef<any>();
    const mapRef = useRef<any>();

    useEffect(() => {
        if (mapRef.current) return;
        mapboxgl.accessToken = publicKey;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [startLng, startLat],
            zoom: zoomLevel
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const MapContainer = () => <div
        style={{ height: '100%', width: '100%' }}
        ref={mapContainerRef}
        className="map-container"
    />

    return { mapRef, MapContainer }
}
