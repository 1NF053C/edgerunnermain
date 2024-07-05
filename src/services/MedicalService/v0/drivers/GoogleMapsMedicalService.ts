import { MedicalService } from '@/services/MedicalService/v0';
import { googleNearbySearch } from '@/utils/googleNearbySearch';

export function createGoogleMapsMedicalService(): MedicalService {
    return {
        async getMedicalPois() {
            const results = await googleNearbySearch('medical');
            return results;
        }
    }
}
