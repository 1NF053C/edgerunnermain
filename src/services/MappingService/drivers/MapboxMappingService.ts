import { MappingServiceInterface } from '@/services/MappingService';

export function createMapBoxMappingService(): MappingServiceInterface {
    const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
    if(!MAPBOX_API_KEY){
        throw TypeError("process.env.MAPBOX_API_KEY is missing")
    }
    return {
        placeMarker(lng, lat) {

        }
    }
}
