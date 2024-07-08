import axios from 'axios';
import { Place } from '@prisma/client';
import { PLACES_WITH_ID_PATH } from '../../../../../api-paths';

export async function getPlace(placeId: number) {
    const apiUrl = PLACES_WITH_ID_PATH(placeId);
    try {
        const response = await axios.get(apiUrl);
        const place: Place = response.data;
        return place;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
