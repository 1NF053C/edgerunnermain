import { createCurrentLocationService } from '@/server/services/CurrentLocationService/v0';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const currentLocationService = createCurrentLocationService();
        const results = await currentLocationService.getCurrentLocation();
        res.status(200).json(results);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}
