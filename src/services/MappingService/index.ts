import { createGoogleMapsMappingService, createMapBoxMappingService } from './drivers';

export interface MappingServiceInterface {
    placeMarker: (lng: number, lat: number) => void;
}

export function createMappingService(): MappingServiceInterface {
    const mappingService = process.env.MAPPING_SERVICE;
    
    if (mappingService === 'GoogleMaps') {
        return createGoogleMapsMappingService();
    }
    else if (mappingService === 'MapBox') {
        return createMapBoxMappingService();
    }
    else {
        throw TypeError('process.env.MAPPING_SERVICE is not a valid MappingService driver');
    }
}
