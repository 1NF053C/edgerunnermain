import { PointOfInterest } from "@/poi-service/src/models/PointOfInterest";
import { createApiNameCurrentlyHiringService } from "./drivers/ApiNameCurrentlyHiringService";

export interface CurrentlyHiringService {
    getCurrentlyHiringPois: () => Promise<PointOfInterest[]>
}

export function createCurrentlyHiringService() {
    const CURRENTLY_HIRING_SERVICE = process.env.CURRENTLY_HIRING_SERVICE;

    if (CURRENTLY_HIRING_SERVICE === 'apiName') {
        return createApiNameCurrentlyHiringService();
    }
    else {
        throw TypeError('process.env.CURRENTLY_HIRING_SERVICE is invalid');
    }
}
