import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import { MapboxPublicConfigService } from '@/pages/api/_services/factory/MapboxPublicConfigService';

const prisma = new PrismaClient()
const mapboxPublicConfigService = new MapboxPublicConfigService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    switch (req.method) {
        case 'GET':
            return getMapboxPublicConfig(req, res, Number(id))
        case 'PUT':
            return updateMapboxPublicConfig(req, res, Number(id))
        case 'DELETE':
            return deleteMapboxPublicConfig(req, res, Number(id))
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getMapboxPublicConfig(req: NextApiRequest, res: NextApiResponse, id: number) {
    const mapboxPublicConfig = await mapboxPublicConfigService.findOne(id)
    if (mapboxPublicConfig) {
        res.status(200).json(mapboxPublicConfig)
    } else {
        res.status(404).json({ message: 'MapboxPublicConfig not found' })
    }
}

async function updateMapboxPublicConfig(req: NextApiRequest, res: NextApiResponse, id: number) {
    try {
        const mapboxPublicConfigData = req.body
        const updatedMapboxPublicConfig = await mapboxPublicConfigService.update(id, mapboxPublicConfigData)
        res.status(201).json(updatedMapboxPublicConfig)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

async function deleteMapboxPublicConfig(req: NextApiRequest, res: NextApiResponse, id: number) {
    await mapboxPublicConfigService.delete(id)
    res.status(204).end()
}
