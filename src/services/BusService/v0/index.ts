import { PointOfInterest } from '@/poi-service/src/models/PointOfInterest';
import { createGoogleMapsBusService } from './drivers/GoogleMapsBusService'

export interface BusService {
    getBusStopPois: () => PointOfInterest[];
}

export function createBusService(): BusService {
    const BUS_SERVICE = process.env.BUS_SERVICE;
    
    if (BUS_SERVICE === 'google') {
        return createGoogleMapsBusService();
    }
    else {
        throw TypeError('process.env.BUS_SERVICE is invalid');
    }
}
