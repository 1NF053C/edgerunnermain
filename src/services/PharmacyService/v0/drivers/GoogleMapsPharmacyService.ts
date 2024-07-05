import { PharmacyService } from '@/services/PharmacyService/v0';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsPharmacyService(): PharmacyService {
    return {
        async getPharmacyPois() {
            const results = await googleNearbySearch('pharmacies');
            return results;
        }
    }
}
