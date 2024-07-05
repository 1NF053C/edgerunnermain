import { HousingService } from '@/services/HousingService/v0';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsHousingService(): HousingService {
    return {
        async getHousingPois() {
            const results = await googleNearbySearch('housing');
            return results;
        }
    }
}
