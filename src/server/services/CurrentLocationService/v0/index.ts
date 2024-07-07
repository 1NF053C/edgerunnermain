import { Coordinates } from '@/contexts/Shared';
import { createGoogleMapsCurrentLocationService } from './drivers/GoogleCurrentLocationService'

export interface CurrentLocationService {
    getCurrentLocation: () => Promise<Coordinates>;
}

export function createCurrentLocationService(): CurrentLocationService {
    const CURRENT_LOCATION_SERVICE = process.env.CURRENT_LOCATION_SERVICE;

    if (CURRENT_LOCATION_SERVICE === 'google') {
        return createGoogleMapsCurrentLocationService();
    }
    else {
        throw TypeError('process.env.CURRENT_LOCATION_SERVICE is invalid');
    }
}
