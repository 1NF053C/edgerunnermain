"use client";
import { createGoogleMapsMappingService } from './drivers/GoogleMapsMappingService';
import { createMapBoxMappingService } from './drivers/MapboxMappingService';
import { Coordinates } from '@/contexts/Shared';

export interface MappingService {
    getRoute: (a: Coordinates, b: Coordinates) => Promise<any>
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
