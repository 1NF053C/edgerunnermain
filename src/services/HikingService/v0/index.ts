import { PointOfInterest } from '@/utils/PointOfInterest';
import { createGoogleMapsHikingService } from './drivers/GoogleMapsHikingService';

export interface HikingService {
    getHikingShoePois: () => PointOfInterest[];
    getHikingTrailPois: () => PointOfInterest[];
}

export function createHikingService(): HikingService {
    const HIKING_SERVICE = process.env.HIKING_SERVICE;

    if (HIKING_SERVICE === 'google') {
        return createGoogleMapsHikingService();
    }
    else {
        throw TypeError('process.env.HIKING_SERVICE is invalid');
    }
}
