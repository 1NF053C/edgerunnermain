import { PointOfInterest } from '@/utils/PointOfInterest';
import { createGoogleMapsGroceryService } from './drivers/GoogleMapsGroceryService'

export interface GroceryService {
    getGroceryPois: () => Promise<PointOfInterest[]>;
}

export function createGroceryService(): GroceryService {
    const GROCERY_SERVICE = process.env.GROCERY_SERVIE;

    if (GROCERY_SERVICE === 'google') {
        return createGoogleMapsGroceryService();
    }
    else {
        throw TypeError('process.env.GROCERY_SERVICE is invalid');
    }
}
