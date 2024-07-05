import { FarmersMarketService } from '@/services/FarmersMarketService/v0';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsFarmersMarketService(): FarmersMarketService {
    return {
        async getFarmersMarketPois() {
            const results = await googleNearbySearch('farmers markets');
            return results;
        }
    }
}
