import type { NextApiRequest, NextApiResponse } from 'next';

const HOST = process.env.HOST;

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const pharmacyPoisRes = await fetch(`${HOST}/api/pharmacy-pois`);
        const pharmacyPois = await pharmacyPoisRes.json();
        res.status(200).json(pharmacyPois);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
