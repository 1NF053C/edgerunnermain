import { MappingService } from '@/server/services/MappingService/v0';

export function createGoogleMapsMappingService(): MappingService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if(!GOOGLE_MAPS_API_KEY){
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }
    return {
        async getRoute(a, b){}
    }
}
