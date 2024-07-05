import { PointOfInterest } from '@/utils/PointOfInterest';
import { createGoogleMapsBusService } from './drivers/GoogleMapsBusService'

export interface BusService {
    getBusStopPois: () => Promise<PointOfInterest[]>;
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
