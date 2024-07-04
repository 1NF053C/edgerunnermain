import { BikingService } from '@/services/BikingService/v0';

export function createGoogleMapsBikingService(): BikingService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if(!GOOGLE_MAPS_API_KEY){
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }
    return {
        getBikeShopPois() {
            return []
        },

        getBikingTrailPois() {
            return []
        }
    }
}
