import axios from 'axios';
import { MapboxPublicConfig } from '@prisma/client';
import { HOST_PORT } from '../../../../../api-paths'

export async function getMapboxPublicConfig(mapboxPublicConfigId: number) {
    try {
        const apiUrl = `${HOST_PORT}/api/mapbox-public-config/${mapboxPublicConfigId}`;
        const response = await axios.get(apiUrl);
        const conf: MapboxPublicConfig = response.data;
        return conf;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
