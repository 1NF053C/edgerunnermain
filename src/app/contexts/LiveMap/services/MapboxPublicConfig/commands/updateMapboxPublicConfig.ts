import axios from 'axios';
import { Place, Prisma } from '@prisma/client';
import { HOST_PORT } from '../../../../../api-paths';

export async function updateMapboxPublicConfig(mapboxPublicConfigId: number, props: Prisma.MapboxPublicConfigUpdateInput) {
    try {
        const apiUrl = `${HOST_PORT}/api/mapbox-public-config/${mapboxPublicConfigId}`;
        const response = await axios.put(apiUrl, props);
        const newPlace: Place = response.data;
        return newPlace;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
