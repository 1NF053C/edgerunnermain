import axios from 'axios';
import { HOST_PORT } from '../../../../../api-paths';

export async function deleteMapboxPublicConfig(mapboxPublicConfigId: number) {
    try {
        const apiUrl = `${HOST_PORT}/api/mapbox-public-config/${mapboxPublicConfigId}`;
        const response = await axios.delete(apiUrl);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
