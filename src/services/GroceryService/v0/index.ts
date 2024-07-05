import { PointOfInterest } from '@/utils/PointOfInterest';
import { createGoogleMapsGroceryService } from './drivers/GoogleMapsGroceryService'

export interface GroceryService {
    getGroceryPois: () => Promise<PointOfInterest[]>;
}

export function createBusService(): GroceryService {
    const GROCERY_SERVICE = process.env.BOOZE_SERVICE;

    if (GROCERY_SERVICE === 'google') {
        return createGoogleMapsGroceryService();
    }
    else {
        throw TypeError('process.env.GROCERY_SERVICE is invalid');
    }
}
