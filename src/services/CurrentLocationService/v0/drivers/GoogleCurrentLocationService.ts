import { CurrentLocationService } from '@/services/CurrentLocationService/v0';
import { googleGeocode } from '@/utils/googleGeocode';

export function createGoogleMapsCurrentLocationService(): CurrentLocationService {
    return {
        async getCurrentLocation() {
            const results = await googleGeocode();
            return results;
        }
    }
}
