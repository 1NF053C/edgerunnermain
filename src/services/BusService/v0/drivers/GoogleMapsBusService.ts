import { BusService } from '@/services/BusService/v0';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsBusService(): BusService {
    return {
        async getBusStopPois() {
            const results = await googleNearbySearch('running shoes');
            return results;
        }
    }
}
