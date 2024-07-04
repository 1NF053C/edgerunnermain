import { PointOfInterest } from "@/utils/PointOfInterest";
import { createGoogleMapsPharmacyService } from "./drivers/GoogleMapsPharmacyService";

export interface PharmacyService {
    getPharmacyPois: () => PointOfInterest
}

export function createPharmacyService() {
    const PHARMACY_SERVICE = process.env.PHARMACY_SERVICE;

    if(PHARMACY_SERVICE === 'google'){
        return createGoogleMapsPharmacyService();
    }
    else {
        throw TypeError('process.env.PHARMACY_SERVICE is invalid');
    }
}
