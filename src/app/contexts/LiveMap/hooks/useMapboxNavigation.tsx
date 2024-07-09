"use client";

import mapboxgl from "mapbox-gl";
import { MutableRefObject, useEffect } from "react";

export function useMapboxNavigation(mapRef: MutableRefObject<any>) {
    useEffect(() => {
        if (!mapRef.current) return;
        const navControl = new mapboxgl.NavigationControl();
        mapRef.current.addControl(navControl, 'top-right');
    }, [mapRef])
}
