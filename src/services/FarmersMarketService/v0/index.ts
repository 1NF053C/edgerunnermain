import { PointOfInterest } from "@/poi-service/src/models/PointOfInterest";
import { createGoogleMapsFarmersMarketService } from "./drivers/GoogleMapsFarmersMarketService";

export interface FarmersMarketService {
    getFarmersMarketPois: () => PointOfInterest
}

export function createFarmersMarketService() {
    const FARMERS_MARKET_SERVICE = process.env.GRILL_SERVICE;

    if (FARMERS_MARKET_SERVICE === 'google') {
        return createGoogleMapsFarmersMarketService();
    }
    else {
        throw TypeError('process.env.FARMERS_MARKET_SERVICE is invalid');
    }
}
