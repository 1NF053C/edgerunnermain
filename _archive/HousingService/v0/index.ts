import { PointOfInterest } from '@/utils/PointOfInterest';
import { createGoogleMapsHousingService } from './drivers/GoogleMapsHousingService'

export interface HousingService {
    getHousingPois: () => Promise<PointOfInterest[]>;
}

export function createHousingService(): HousingService {
    const GROCERY_SERVICE = process.env.BOOZE_SERVICE;

    if (GROCERY_SERVICE === 'google') {
        return createGoogleMapsHousingService();
    }
    else {
        throw TypeError('process.env.HOUSING_SERVICE is invalid');
    }
}
