import { createMappingService } from '@/server/services/MappingService/v0';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { startCoords, endCoords } = req.body;
        const mappingService = createMappingService();
        const results = await mappingService.getRoute(startCoords, endCoords);
        res.status(200).json(results);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
