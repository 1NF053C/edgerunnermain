import { PointOfInterest } from "@/poi-service/src/models/PointOfInterest";
import { createGoogleMapsCafeService } from "./drivers/GoogleMapsCafeService";

export interface CafeService {
    getCafePois: () => PointOfInterest
}

export function createCafeService() {
    const CAFE_SERVICE = process.env.CAFE_SERVICE;

    if (CAFE_SERVICE === 'google') {
        return createGoogleMapsCafeService();
    }
    else {
        throw TypeError('process.env.CAFE_SERVICE is invalid');
    }
}
