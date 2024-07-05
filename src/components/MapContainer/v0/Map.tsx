import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Coordinates, googleGeocode } from '@/utils/googleGeocode';

interface MapProps {
    data: any[]
}

export function Map({ data }: MapProps) {
    const mapContainerRef = useRef<any>();
    const mapRef = useRef<any>();
    const [coords, setCoords] = useState<Coordinates>();

    useEffect(() => {
        fetch('/api/current-location')
            .then((res) => res.json())
            .then((coords) => setCoords(coords))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (coords) {
            mapboxgl.accessToken = '';
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [coords.lng, coords.lat], // starting position [lng, lat]
                zoom: 9 // starting zoom
            })
        }
    }, [coords]);

    return (
        <div
            style={{ height: '100%', width: '100%' }}
            ref={mapContainerRef}
            className="map-container"
        />
    );
}
