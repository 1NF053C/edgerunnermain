import axios from 'axios';
import { PharmacyService } from '@/services/PharmacyService/v0';

export function createGoogleMapsPharmacyService(): PharmacyService {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
        throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")
    }

    return {
        async getPharmacyPois() {
            const results = await searchPharmacies(GOOGLE_MAPS_API_KEY);
            return results;
        }
    }
}

async function searchPharmacies(apiKey: string) {
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

    const query = 'pharmacy';
    const params = {
        input: query,
        inputtype: 'textquery',
        fields: 'name,geometry',
        key: apiKey,
    };

    try {
        const response = await axios.get(baseUrl, { params });
        const { candidates } = response.data;

        if (candidates && candidates.length > 0) {
            return candidates;
        } else {
            console.log('No pharmacies found.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching pharmacies:', error);
        return [];
    }
}
