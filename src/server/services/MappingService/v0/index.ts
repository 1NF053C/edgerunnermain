"use client";
import { PlaceOfInterest } from '@/utils/PlaceOfInterest';

import { createGoogleMapsMappingService } from './drivers/GoogleMapsMappingService';
import { createMapBoxMappingService } from './drivers/MapboxMappingService';
import { Ref } from 'react';
import { Marker } from 'mapbox-gl';

type id = string;

export interface MappingService {
    placeMarker: (lng: number, lat: number) => id;
    removeMarker: (id: id) => void;
    placeRoute: (a: PlaceOfInterest, b: PlaceOfInterest) => id;
    removeRoute: (id: string) => void;
}

export function createMappingService(): MappingService {
    const MAPPING_SERVICE = process.env.MAPPING_SERVICE;

    if (MAPPING_SERVICE === 'google') {
        return createGoogleMapsMappingService();
    }
    else if (MAPPING_SERVICE === 'mapbox') {
        return createMapBoxMappingService();
    }
    else {
        throw TypeError('process.env.MAPPING_SERVICE is invalid');
    }
}
