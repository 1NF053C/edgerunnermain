"use client";

import React, { useEffect, useRef } from 'react';
import { MapVisualizationState } from '@/contexts/MapVisualization';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapVisualization.css';

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
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [data.currentCoordinates.lng, data.currentCoordinates.lat],
            zoom: data.startingZoom
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

function useMarkers(mapRef: any, { data }: MapVisualizationProps) {
    if (!data) throw 'MapVisualization props.data has to be initialized to a nonnull value in its parent container.';

    useEffect(() => {
        if (!mapRef.current) return;

        const addCurrentLocationAndPoiMarkersOnMapLoad = () => {
            if (mapRef.current.getSource('points')) return;

            const navControl = new mapboxgl.NavigationControl();
            mapRef.current.addControl(navControl, 'top-right');

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

            mapRef.current.on('mouseenter', 'startingCoordsCircle', () => {
                mapRef.current.getCanvas().style.cursor = 'pointer';
            });

            mapRef.current.on('mouseleave', 'startingCoordsCircle', () => {
                mapRef.current.getCanvas().style.cursor = '';
            });

            mapRef.current.on('click', 'startingCoordsCircle', () => {
                mapRef.current.flyTo({
                    center: [data.currentCoordinates.lng, data.currentCoordinates.lat]
                });
            });

            const el = document.createElement('div');
            el.className = 'pulsing-circle';

            new mapboxgl.Marker(el)
                .setLngLat([data.currentCoordinates.lng, data.currentCoordinates.lat])
                .addTo(mapRef.current);


            mapRef.current.addSource('points', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: (data.placesOfInterest).map(poi => ({
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: [poi.coordinates.lng, poi.coordinates.lat]
                        },
                        id: poi.id
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
        }

        mapRef.current.on('load', addCurrentLocationAndPoiMarkersOnMapLoad);

        return () => {
            if (mapRef.current) {
                mapRef.current.off('load', addCurrentLocationAndPoiMarkersOnMapLoad);
            }
        };
    }, [mapRef.current])
}

function useRoutes(mapRef: any, { data }: MapVisualizationProps) {
    if (!data) throw 'MapVisualization props.data has to be initialized to a nonnull value in its parent container.';

    useEffect(() => {
        const geojson = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: data.routeData.map(route => ({
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: route.geometry.coordinates
                    },
                    id: JSON.stringify(route.geometry.coordinates)
                }))
            }
        }

        const addRouteOnMapLoad = async () => {
            if (mapRef.current.getLayer('route')) return;

            mapRef.current.addLayer({
                id: 'route',
                type: 'line',
                source: geojson,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }

        // Add the route to the map
        mapRef.current.on('load', addRouteOnMapLoad);

        return () => {
            if (mapRef.current) {
                mapRef.current.off('load', addRouteOnMapLoad);
            }
        };
    }, [mapRef.current])
}

export function MapVisualization({ data }: MapVisualizationProps) {
    if (!data) throw 'MapVisualization props.data has to be initialized to a nonnull value in its parent container.';

    const { mapRef, mapContainerRef } = useMap({ data: data });
    useRoutes(mapRef, { data: data });
    useMarkers(mapRef, { data: data });

    return (
        <div
            style={{ height: '100%', width: '100%' }}
            ref={mapContainerRef}
            className="map-container"
        />
    );
}
