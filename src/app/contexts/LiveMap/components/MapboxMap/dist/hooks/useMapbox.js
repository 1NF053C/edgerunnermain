"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
export function useMapbox(props) {
    if (!props)
        throw 'useMapbox props has to be initialized to a nonnull value in its parent container.';
    var mapContainerRef = useRef();
    var mapRef = useRef();
    useEffect(function () {
        if (mapRef.current)
            return;
        mapboxgl.accessToken = props.publicKey;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [props.startLng, props.startLat],
            zoom: props.zoomLevel
        });
        return function () {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);
    return { mapContainerRef: mapContainerRef, mapRef: mapRef };
}
