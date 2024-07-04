import { BusService } from '@/services/BusService/v0';

export function createGoogleMapsBusService(): BusService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }
    return {
        getBusStopPois() {
            return []
        }
    }
}
