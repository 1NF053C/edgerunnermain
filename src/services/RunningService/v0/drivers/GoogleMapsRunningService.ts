import { RunningService } from '@/services/RunningService/v0';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsRunningService(): RunningService {
    return {
        async getRunningShoePois() {
            const results = await googleNearbySearch('running shoes');
            return results;
        }
    }
}
