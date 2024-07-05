import { BoozeService } from '@/services/archive/BoozeService/v0'

export function createGoogleMapsBoozeService(): BoozeService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }
    return {
        getBoozePois() {
            return []
        }
    }
}
