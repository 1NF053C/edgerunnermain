import { PointOfInterest } from '@/utils/PointOfInterest';
import { createGoogleMapsBikingService } from './drivers/GoogleMapsBikingService';

export interface BikingService {
    getBikeShopPois: () => Promise<PointOfInterest[]>;
    getBikingTrailPois: () => Promise<PointOfInterest[]>;
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
