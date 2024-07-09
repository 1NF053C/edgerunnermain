require('dotenv').config({ path: '.env.local' });

import { MapboxPublicConfigService } from '@/utils/DbClientFactory'; // or use api client...
import { getHostPort } from '@/utils/getHostPort';

import { PrismaClient } from '@prisma/client'
import axios from 'axios';

export async function seed() {
    // By default, seed mapbox config with existing public key and starting coords
    // Starting coords are based off of the provided city state string in the environment
    const prisma = new PrismaClient()
    const mapboxPublicConfigService = new MapboxPublicConfigService(prisma);

    const MAPBOX_PUBLIC_KEY = process.env.MAPBOX_PUBLIC_KEY;
    if (!MAPBOX_PUBLIC_KEY) throw TypeError('process.env.MAPBOX_PUBLIC_KEY is invalid');

    const CITY_STATE = process.env.CITY_STATE;
    if (!CITY_STATE) throw TypeError('process.env.CITY_STATE is invalid');

    const confs = await mapboxPublicConfigService.findAll();
    for (const c of confs) {
        await mapboxPublicConfigService.delete(c.id);
    }
    const response = await axios.get(`${getHostPort()}/api/geocode`);
    const coords = response.data;

    await mapboxPublicConfigService.create({
        startLng: coords.lng,
        startLat: coords.lat,
        zoomLevel: 12,
        publicKey: MAPBOX_PUBLIC_KEY
    });

    const loadedConfs = await mapboxPublicConfigService.findAll();
    console.log(JSON.stringify(loadedConfs, null, 4));

    await prisma.$disconnect();
}

console.log('Seeding database...')
seed().then(() => console.log("Database seeded!")).catch(err => console.log(err))
