import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import { PlaceService } from '@/pages/api/_services/factory/PlaceService';

const prisma = new PrismaClient()
const placeService = new PlaceService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    switch (req.method) {
        case 'GET':
            return getPlace(req, res, Number(id))
        case 'PUT':
            return updatePlace(req, res, Number(id))
        case 'DELETE':
            return deletePlace(req, res, Number(id))
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getPlace(req: NextApiRequest, res: NextApiResponse, id: number) {
    const place = await placeService.findOne(id)
    if (place) {
        res.status(200).json(place)
    } else {
        res.status(404).json({ message: 'Place not found' })
    }
}

async function updatePlace(req: NextApiRequest, res: NextApiResponse, id: number) {
    try {
        const placeData = req.body
        const updatedPlace = await placeService.update(id, placeData)
        res.status(201).json(updatedPlace)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

async function deletePlace(req: NextApiRequest, res: NextApiResponse, id: number) {
    await placeService.delete(id)
    res.status(204).end()
}
