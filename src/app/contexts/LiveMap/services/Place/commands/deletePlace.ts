import axios from 'axios';
import { PLACES_WITH_ID_PATH } from '../../../../../api-paths';

export async function deletePlace(placeId: number) {
    const apiUrl = PLACES_WITH_ID_PATH(placeId);
    try {
        const response = await axios.delete(apiUrl);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
