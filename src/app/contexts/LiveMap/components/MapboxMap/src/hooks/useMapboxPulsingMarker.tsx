"use client";

import { MutableRefObject, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { v4 as uuidv4 } from 'uuid';
import { Coordinates } from './Coordinates';
import './pulsing-marker.css';

export function useMapboxPulsingMarker(mapRef: MutableRefObject<any>, coordinates: Coordinates) {
    useEffect(() => {
        if (!mapRef.current) return;
        const renderPulsingMarker = () => {
            const pointGeoJson = createPointGeoJson(coordinates);
            const sourceName = addSource(mapRef, pointGeoJson);
            const circleStyleLayer = createCircleStyleLayer(sourceName);
            addLayer(mapRef, circleStyleLayer);
            addMouseEffects(mapRef, coordinates);
            addPulseEffect(mapRef, coordinates);
        }
        mapRef.current.on('load', renderPulsingMarker);
        return () => {
            if (mapRef.current) {
                mapRef.current.off('load', renderPulsingMarker);
            }
        }
    }, [mapRef])
}

function addSource(mapRef: MutableRefObject<any>, sourceObj: any) {
    const sourceName = `source-${uuidv4()}`;
    mapRef.current.addSource(sourceName, sourceObj);
    mapRef.current.addLayer
    return sourceName;
}

function createPointGeoJson(coordinates: Coordinates) {
    return {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                    type: "Point",
                    coordinates: [coordinates.lng, coordinates.lat]
                },
                id: JSON.stringify(coordinates)
            }]
        }
    }
}

function createCircleStyleLayer(sourceName: string) {
    const id = `circlestylelayer-${uuidv4()}`;
    return {
        id: id,
        type: 'circle',
        source: sourceName,
        paint: {
            'circle-color': 'red',
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    }
}

function addLayer(mapRef: MutableRefObject<any>, layerObj: any) {
    mapRef.current.addLayer(layerObj);
    return layerObj.id;
}

function addMouseEffects(mapRef: MutableRefObject<any>, coordinates: Coordinates) {
    mapRef.current.on('mouseenter', 'startingCoordsCircle', () => {
        mapRef.current.getCanvas().style.cursor = 'pointer';
    });

    mapRef.current.on('mouseleave', 'startingCoordsCircle', () => {
        mapRef.current.getCanvas().style.cursor = '';
    });

    mapRef.current.on('click', 'startingCoordsCircle', () => {
        mapRef.current.flyTo({
            center: [coordinates.lng, coordinates.lat]
        });
    });
}

function addPulseEffect(mapRef: MutableRefObject<any>, coordinates: Coordinates) {
    const el = document.createElement('div');
    el.className = 'pulsing-circle';
    new mapboxgl.Marker(el)
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(mapRef.current);
}
