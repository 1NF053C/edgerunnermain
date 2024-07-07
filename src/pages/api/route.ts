import type { NextApiRequest, NextApiResponse } from 'next';

import { Coordinates } from '@/contexts/Shared';
import { createMappingService } from '@/server/services/MappingService/v0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.query.coordPairs) {
            res.status(400).json({ error: "ERR: Missing coordPairs path param" });
        }
        else {
            type CoordPairs = { start: Coordinates, end: Coordinates }[];
            const coordPairs: CoordPairs = JSON.parse(decodeURIComponent(String(req.query.coordPairs)));

            const mappingService = createMappingService();

            let results = []
            for await (const coordPair of coordPairs) {
                const result = await mappingService.getRoute(coordPair.start, coordPair.end);
                results.push(result);
            }

            res.status(200).json(results);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
