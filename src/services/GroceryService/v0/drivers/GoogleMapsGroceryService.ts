import { GroceryService } from '@/services/GroceryService/v0';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsGroceryService(): GroceryService {
    return {
        async getGroceryPois() {
            const results = await googleNearbySearch('groceries');
            return results;
        }
    }
}
