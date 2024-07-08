import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { MapboxPublicConfigService } from '@/utils/DbClientFactory';

const prisma = new PrismaClient()
const mapboxPublicConfigService = new MapboxPublicConfigService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getMapboxPublicConfig(req, res);
        case 'POST':
            return createMapboxPublicConfig(req, res)
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getMapboxPublicConfig(req: NextApiRequest, res: NextApiResponse) {
    const mapboxPublicConfig = await mapboxPublicConfigService.findAll()
    res.status(200).json(mapboxPublicConfig)
}

async function createMapboxPublicConfig(req: NextApiRequest, res: NextApiResponse) {
    try {
        const mapboxPublicConfigData = req.body
        const newMapboxPublicConfig = await mapboxPublicConfigService.create(mapboxPublicConfigData)
        res.status(201).json(newMapboxPublicConfig)
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
