import axios from 'axios';
import { MapboxPublicConfig } from '@prisma/client';
import { HOST_PORT } from '../../../../../api-paths';

export async function listMapboxPublicConfigs() {
    try {
        const apiUrl = `${HOST_PORT}/api/mapbox-public-config`;
        const response = await axios.get(apiUrl);
        const mapboxPublicConfigs: MapboxPublicConfig[] = response.data;
        return mapboxPublicConfigs;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
