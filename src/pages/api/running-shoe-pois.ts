import { createRunningService } from '@/services/RunningService/v0';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const runningService = createRunningService();
        const results = await runningService.getRunningShoePois();
        res.status(200).json(results);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
