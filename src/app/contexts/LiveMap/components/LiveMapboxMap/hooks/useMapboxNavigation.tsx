"use client";

import { MutableRefObject, useEffect } from "react";
import mapboxgl from "mapbox-gl";

export function useMapboxNavigation(mapRef: MutableRefObject<any>) {
    useEffect(() => {
        if (!mapRef.current) return;
        const renderNavControls = () => {
            const navControl = new mapboxgl.NavigationControl();
            mapRef.current.addControl(navControl, 'top-right');
        }
        mapRef.current.on('load', renderNavControls);
        return () => {
            if (mapRef.current) {
                mapRef.current.off('load', renderNavControls);
            }
        }
    }, [mapRef])
}
