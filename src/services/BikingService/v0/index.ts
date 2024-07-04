import { PointOfInterest } from '@/poi-service/src/models/PointOfInterest';
import { createGoogleMapsBikingService } from './drivers/GoogleMapsBikingService';

export interface BikingService {
    getBikeShopPois: () => PointOfInterest[];
    getBikingTrailPois: () => PointOfInterest[];
}

export function createBikingService(): BikingService {
    const BIKING_SERVICE = process.env.BIKING_SERVICE;
    
    if (BIKING_SERVICE === 'google') {
        return createGoogleMapsBikingService();
    }
    else {
        throw TypeError('process.env.Biking_SERVICE is invalid');
    }
}
