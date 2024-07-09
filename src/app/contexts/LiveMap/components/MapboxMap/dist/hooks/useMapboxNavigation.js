"use client";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
export function useMapboxNavigation(mapRef) {
    useEffect(function () {
        if (!mapRef.current)
            return;
        var renderNavControls = function () {
            var navControl = new mapboxgl.NavigationControl();
            mapRef.current.addControl(navControl, 'top-right');
        };
        mapRef.current.on('load', renderNavControls);
        return function () {
            if (mapRef.current) {
                mapRef.current.off('load', renderNavControls);
            }
        };
    }, [mapRef]);
}
