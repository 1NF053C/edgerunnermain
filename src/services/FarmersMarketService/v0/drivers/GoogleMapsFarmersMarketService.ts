import { FarmersMarketService } from '@/services/FarmersMarketService/v0';

export function createGoogleMapsFarmersMarketService(): FarmersMarketService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }
    return {
        getFarmersMarketPois() {
            return []
        }
    }
}
