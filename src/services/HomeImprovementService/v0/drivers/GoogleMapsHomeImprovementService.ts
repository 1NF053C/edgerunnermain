import { HomeImprovementService } from '@/services/HomeImprovementService/v0';

export function createGoogleMapsHomeImprovementService(): HomeImprovementService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    if (!GOOGLE_MAPS_API_KEY) {
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }

    return {
        getCarpentryPois() {
            return []
        },

        getPaintSupplyPois() {
            return []
        }
    }
}
