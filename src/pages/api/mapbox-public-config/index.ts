import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { MapboxPublicConfigService } from '@/pages/api/_services/factory/MapboxPublicConfigService';

const prisma = new PrismaClient()
const mapboxPublicConfigService = new MapboxPublicConfigService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getMapboxPublicConfig(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getMapboxPublicConfig(req: NextApiRequest, res: NextApiResponse) {
    const mapboxPublicConfig = await mapboxPublicConfigService.findAll()
    res.status(200).json(mapboxPublicConfig)
}
