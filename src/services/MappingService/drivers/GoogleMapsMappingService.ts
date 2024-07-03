import { MappingServiceInterface } from '@/services/MappingService';

export function createGoogleMapsMappingService(): MappingServiceInterface {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if(!GOOGLE_MAPS_API_KEY){
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }
    return {
        placeMarker(lng, lat) {

        }
    }
}
