import axios from "axios";
import { MapboxPublicConfig, Prisma } from "@prisma/client";
import { HOST_PORT } from '../../../../../api-paths';

export async function createMapboxPublicConfig(input: Prisma.MapboxPublicConfigCreateInput){
    try {
        const apiUrl = `${HOST_PORT}/api/mapbox-public-config`;
        const response = await axios.post(apiUrl, input);
        const newConfig: MapboxPublicConfig = response.data;
        return newConfig;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
