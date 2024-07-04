import { PointOfInterest } from '@/utils/PointOfInterest';

import { createGoogleMapsHomeImprovementService } from './drivers/GoogleMapsHomeImprovementService';

type id = string;

export interface HomeImprovementService {
    getCarpentryPois: () => PointOfInterest[],
    getPaintSupplyPois: () => PointOfInterest[]
}

export function createMappingService(): HomeImprovementService {
    const HOME_IMPROVEMENT_SERVICE = process.env.HOME_IMPROVEMENT_SERVICE;

    if (HOME_IMPROVEMENT_SERVICE === 'google') {
        return createGoogleMapsHomeImprovementService();
    }
    else {
        throw TypeError('process.env.HOME_IMPROVEMENT_SERVICE is invalid');
    }
}
