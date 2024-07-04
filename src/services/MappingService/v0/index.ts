import { PointOfInterest } from '@/poi-service/src/models/PointOfInterest';

import { createGoogleMapsMappingService } from './drivers/GoogleMapsMappingService';
import { createMapBoxMappingService } from './drivers/MapboxMappingService';

type id = string;

export interface MappingService {
    placeMarker: (lng: number, lat: number) => id;
    removeMarker: (id: string) => void;
    placeRoute: (a: PointOfInterest, b: PointOfInterest) => id;
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
