import axios from 'axios';
import { Place, Prisma } from '@prisma/client';
import { PLACES_WITH_ID_PATH } from '../../../../../api-paths';

export async function updatePlace(placeId: number, props: Prisma.PlaceUpdateInput) {
    const apiUrl = PLACES_WITH_ID_PATH(placeId);
    try {
        const response = await axios.put(apiUrl, props);
        const newPlace: Place = response.data;
        return newPlace;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
