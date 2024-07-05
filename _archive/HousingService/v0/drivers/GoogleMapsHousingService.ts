import { HousingService } from '..';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsHousingService(): HousingService {
    return {
        async getHousingPois() {
            const results = await googleNearbySearch('housing');
            return results;
        }
    }
}
