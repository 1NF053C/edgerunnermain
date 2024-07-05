import { PointOfInterest } from '@/utils/PointOfInterest';
import { createGoogleMapsMedicalService } from './drivers/GoogleMapsMedicalService'

export interface MedicalService {
    getMedicalPois: () => Promise<PointOfInterest[]>;
}

export function createMedicalService(): MedicalService {
    const GROCERY_SERVICE = process.env.BOOZE_SERVICE;

    if (GROCERY_SERVICE === 'google') {
        return createGoogleMapsMedicalService();
    }
    else {
        throw TypeError('process.env.MEDICAL_SERVICE is invalid');
    }
}
