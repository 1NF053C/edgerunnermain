"use client";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { v4 as uuidv4 } from 'uuid';
import './pulsing-marker.css';
export function useMapboxPulsingMarker(mapRef, coordinates) {
    useEffect(function () {
        if (!mapRef.current)
            return;
        var renderPulsingMarker = function () {
            var pointGeoJson = createPointGeoJson(coordinates);
            var sourceName = addSource(mapRef, pointGeoJson);
            var circleStyleLayer = createCircleStyleLayer(sourceName);
            addLayer(mapRef, circleStyleLayer);
            addMouseEffects(mapRef, coordinates);
            addPulseEffect(mapRef, coordinates);
        };
        mapRef.current.on('load', renderPulsingMarker);
        return function () {
            if (mapRef.current) {
                mapRef.current.off('load', renderPulsingMarker);
            }
        };
    }, [mapRef]);
}
function addSource(mapRef, sourceObj) {
    var sourceName = "source-".concat(uuidv4());
    mapRef.current.addSource(sourceName, sourceObj);
    mapRef.current.addLayer;
    return sourceName;
}
function createPointGeoJson(coordinates) {
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
    };
}
function createCircleStyleLayer(sourceName) {
    var id = "circlestylelayer-".concat(uuidv4());
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
    };
}
function addLayer(mapRef, layerObj) {
    mapRef.current.addLayer(layerObj);
    return layerObj.id;
}
function addMouseEffects(mapRef, coordinates) {
    mapRef.current.on('mouseenter', 'startingCoordsCircle', function () {
        mapRef.current.getCanvas().style.cursor = 'pointer';
    });
    mapRef.current.on('mouseleave', 'startingCoordsCircle', function () {
        mapRef.current.getCanvas().style.cursor = '';
    });
    mapRef.current.on('click', 'startingCoordsCircle', function () {
        mapRef.current.flyTo({
            center: [coordinates.lng, coordinates.lat]
        });
    });
}
function addPulseEffect(mapRef, coordinates) {
    var el = document.createElement('div');
    el.className = 'pulsing-circle';
    new mapboxgl.Marker(el)
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(mapRef.current);
}
