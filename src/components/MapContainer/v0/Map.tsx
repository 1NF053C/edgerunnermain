import { useEffect, useRef, useState } from 'react';
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
        if (mapRef.current) return;
        mapboxgl.accessToken = mapboxGlAccessToken;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [startingCoords.lng, startingCoords.lat],
            zoom: startingZoom
        });
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;
        mapRef.current.on('load', function () {
            if (mapRef.current.getSource('points')) return;

            const navControl = new mapboxgl.NavigationControl();
            mapRef.current.addControl(navControl, 'top-right'); // Adjust position as needed

            mapRef.current.addSource('startingCoords', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: [startingCoords.lng, startingCoords.lat]
                        },
                        id: String(startingCoords.lng) + String(startingCoords.lat)
                    }]
                }
            });

            mapRef.current.addLayer({
                id: 'startingCoordsCircle',
                type: 'circle',
                source: 'startingCoords',
                paint: {
                    'circle-color': 'red',
                    'circle-radius': 8,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });

            mapRef.current.addSource('points', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: pois.map(poi => ({
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: [poi.lng, poi.lat]
                        },
                        id: String(poi.lng) + String(poi.lat)
                    }))
                }
            });

            mapRef.current.addLayer({
                id: 'circles',
                type: 'circle',
                source: 'points',
                paint: {
                    'circle-color': '#4264fb',
                    'circle-radius': 8,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });

            mapRef.current.on('click', 'circle', (e: any) => {
                mapRef.current.flyTo({
                    center: e.features[0].geometry.coordinates
                });
            });

            mapRef.current.on('mouseenter', 'circle', () => {
                mapRef.current.getCanvas().style.cursor = 'pointer';
            });

            mapRef.current.on('mouseleave', 'circle', () => {
                mapRef.current.getCanvas().style.cursor = '';
            });

            // pois.forEach(poi => {
            //     new mapboxgl.Marker()
            //         .setLngLat([poi.lng, poi.lat])
            //         .addTo(mapRef.current);
            // });

            // const currentLocationMarker = new mapboxgl.Marker()
            //     .setLngLat([startingCoords.lng, startingCoords.lat])
            //     .addTo(mapRef.current);

            // const markerElement = currentLocationMarker.getElement();
            // if (markerElement) {
            //     markerElement.style.background = 'red'; // Change color using CSS
            // }

        })

    }, [mapRef.current])

    return (
        <div
            style={{ height: '100%', width: '100%' }}
            ref={mapContainerRef}
            className="map-container"
        />
    );
}
