import { HomeImprovementService } from '..';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsHomeImprovementService(): HomeImprovementService {
    return {
        async getHardwareStorePois() {
            const results = await googleNearbySearch('hardware stores');
            return results;
        },

        async getPaintSupplyStorePois() {
            const results = await googleNearbySearch('paint supply stores');
            return results;
        }
    }
}
