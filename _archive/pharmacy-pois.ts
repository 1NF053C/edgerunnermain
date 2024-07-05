import { createPharmacyService } from './PharmacyService/v0';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const pharmacyService = createPharmacyService();
        const results = await pharmacyService.getPharmacyPois();
        res.status(200).json(results);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
