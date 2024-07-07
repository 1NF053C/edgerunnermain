"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapVisualization.css';
import { MapVisualizationState } from '@/contexts/MapVisualization/store/core/state';

interface MapVisualizationProps {
    data: MapVisualizationState['data']
}

function useMap({ data }: MapVisualizationProps) {
    if (!data) throw 'MapVisualization props.data has to be initialized to a nonnull value in its parent container.';

    const mapContainerRef = useRef<any>();
    const mapRef = useRef<any>();

    useEffect(() => {
        if (mapRef.current) return;
        mapboxgl.accessToken = data.publicToken;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [data.currentCoordinates.lng, data.currentCoordinates.lat],
            zoom: data.startingZoom
        });
    }, []);

    return { mapContainerRef, mapRef }
}

function useMarkers(mapRef: any, { data }: MapVisualizationProps) {
    if (!data) throw 'MapVisualization props.data has to be initialized to a nonnull value in its parent container.';

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
                            coordinates: [data.currentCoordinates.lng, data.currentCoordinates.lat]
                        },
                        id: String(data.currentCoordinates.lng) + String(data.currentCoordinates.lat)
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

            const el = document.createElement('div');
            el.className = 'pulsing-circle'
            new mapboxgl.Marker(el)
                .setLngLat([data.currentCoordinates.lng, data.currentCoordinates.lat])
                .addTo(mapRef.current);

            el.onclick = (e: any) => {
                mapRef.current.flyTo({
                    center: [data.currentCoordinates.lng, data.currentCoordinates.lat]
                });
            }

            el.onmouseover = (e: any) => {
                mapRef.current.getCanvas().style.cursor = 'pointer';
            };

            el.onmouseout = (e: any) => {
                mapRef.current.getCanvas().style.cursor = '';
            };

            mapRef.current.addSource('points', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: ([] as any[]).map(poi => ({
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
}

export function MapVisualization({ data }: MapVisualizationProps) {
    if (!data) throw 'MapVisualization props.data has to be initialized to a nonnull value in its parent container.';

    const { mapRef, mapContainerRef } = useMap({ data: data });
    useMarkers(mapRef, { data: data })

    return (
        <div
            style={{ height: '100%', width: '100%' }}
            ref={mapContainerRef}
            className="map-container"
        />
    );
}
