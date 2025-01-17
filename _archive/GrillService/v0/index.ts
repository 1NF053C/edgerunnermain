import { PointOfInterest } from "@/poi-service/src/models/PointOfInterest";
import { createGoogleMapsGrillService } from "./drivers/GoogleMapsGrillService";

export interface GrillService {
    getGrillSupplyPois: () => Promise<PointOfInterest[]>
}

export function createGrillService() {
    const GRILL_SERVICE = process.env.GRILL_SERVICE;

    if(GRILL_SERVICE === 'google'){
        return createGoogleMapsGrillService();
    }
    else {
        throw TypeError('process.env.GRILL_SERVICE is invalid');
    }
}
