import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface MapProps {
    startingCoords: {
        lng: number,
        lat: number
    },
    startingZoom: number,
    mapboxGlAccessToken: string,
    pois: any[]
}

export function Map({ mapboxGlAccessToken, startingZoom, startingCoords, pois }: MapProps) {
    const mapContainerRef = useRef<any>();
    const mapRef = useRef<any>();

    useEffect(() => {
        mapboxgl.accessToken = mapboxGlAccessToken;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [startingCoords.lng, startingCoords.lat],
            zoom: startingZoom
        });
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            pois.forEach(poi => {
                new mapboxgl.Marker()
                    .setLngLat([poi.lng, poi.lat])
                    .addTo(mapRef.current);
            });
            new mapboxgl.Marker()
                .setLngLat([startingCoords.lng, startingCoords.lat])
                .addTo(mapRef.current)
        }
    }, [mapRef.current])

    return (
        <div
            style={{ height: '100%', width: '100%' }}
            ref={mapContainerRef}
            className="map-container"
        />
    );
}
