import { RunningService } from "@/services/RunningService/v0";

export function createGoogleMapsRunningService(): RunningService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }
    return {
        getRunningShoePois() {
            return []
        },

        getGymWithTreadmillPois() {
            return []
        }
    }
}
