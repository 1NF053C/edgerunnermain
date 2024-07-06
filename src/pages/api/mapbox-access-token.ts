import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

        if (!MAPBOX_ACCESS_TOKEN) {
            throw TypeError('process.env.MAPBOX_ACCESS_TOKEN is invalid');
        }
        
        res.status(200).json(MAPBOX_ACCESS_TOKEN);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}
