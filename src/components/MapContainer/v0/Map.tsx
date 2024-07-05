import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
    data: any[]
}

export function Map({ data }: MapProps) {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    mapboxgl.accessToken = 'ACCES_TOKEN'

    useEffect(() => {
        if (mapContainerRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [-74.5, 40], // starting position [lng, lat]
                zoom: 9
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    if (data.length === 0) return <div>empty map</div>
    return <div
        style={{ height: '100%' }}
        ref={mapContainerRef}
        className="map-container"
    />
}
