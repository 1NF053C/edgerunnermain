import { PlaceOfInterest } from "@/contexts/Shared/models/PlaceOfInterest";
import { createGoogleMapsRunningService } from "./drivers/GoogleMapsRunningService";

export interface RunningService {
    getRunningShoePois: () => Promise<PlaceOfInterest[]>,
}

export async function createRunningService(): Promise<RunningService> {
    const RUNNING_SERVICE = process.env.RUNNING_SERVICE;

    if (RUNNING_SERVICE === 'google') {
        return (await createGoogleMapsRunningService())
    }
    else {
        throw TypeError("process.env.RUNNING_SERVICE is invalid")
    }
}
