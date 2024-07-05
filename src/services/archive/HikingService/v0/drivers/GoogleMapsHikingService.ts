import { HikingService } from '@/services/HikingService/v0';

export function createGoogleMapsHikingService(): HikingService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if(!GOOGLE_MAPS_API_KEY){
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }
    return {
        getHikingShoePois() {
            return []
        },

        getHikingTrailPois() {
            return []
        }
    }
}
