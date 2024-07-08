import axios from 'axios';
import { Place, Prisma } from '@prisma/client';
import { PLACES_PATH } from '../../../../../api-paths';

const apiUrl = PLACES_PATH;

export async function createPlace(props: Prisma.PlaceCreateInput) {
    try {
        const response = await axios.post(apiUrl, props);
        const newPlace: Place = response.data;
        return newPlace;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
