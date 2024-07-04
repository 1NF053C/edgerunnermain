import { PointOfInterest } from '@/poi-service/src/models/PointOfInterest';
import { createGoogleMapsBoozeService } from './drivers/GoogleMapsBoozeService'

export interface BoozeService {
    getBoozePois: () => PointOfInterest[];
}

export function createBusService(): BoozeService {
    const BOOZE_SERVICE = process.env.BOOZE_SERVICE;
    
    if (BOOZE_SERVICE === 'google') {
        return createGoogleMapsBoozeService();
    }
    else {
        throw TypeError('process.env.BOOZE_SERVICE is invalid');
    }
}
