import { PointOfInterest } from "@/poi-service/src/models/PointOfInterest";
import { createGoogleMapsRunningService } from "./drivers/GoogleMapsRunningService";

export interface RunningService {
    getRunningShoePois: () => PointOfInterest[],
    getGymWithTreadmillPois: () => PointOfInterest[]
}

export function createRunningService(): RunningService {
    const RUNNING_SERVICE = process.env.RUNNING_SERVICE;

    if (RUNNING_SERVICE === 'google') {
        return createGoogleMapsRunningService();
    }
    else {
        throw TypeError("process.env.RUNNING_SERVICE is invalid")
    }
}
