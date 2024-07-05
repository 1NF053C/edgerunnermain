import { PharmacyService } from '..';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsPharmacyService(): PharmacyService {
    return {
        async getPharmacyPois() {
            const results = await googleNearbySearch('pharmacies');
            return results;
        }
    }
}
