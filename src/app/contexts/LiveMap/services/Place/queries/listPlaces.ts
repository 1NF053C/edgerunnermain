import axios from 'axios';
import { Place } from '@prisma/client';
import { PLACES_PATH } from '../../../../../api-paths';

export async function listPlaces() {
    const apiUrl = PLACES_PATH;
    try {
        const response = await axios.get(apiUrl);
        const places: Place[] = response.data;
        return places;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
