import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { PlaceService } from '@/utils/DbClientFactory';

const prisma = new PrismaClient()
const placeService = new PlaceService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getPlaces(req, res)
    case 'POST':
      return createPlace(req, res)
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function getPlaces(req: NextApiRequest, res: NextApiResponse) {
  const places = await placeService.findAll()
  res.status(200).json(places)
}

async function createPlace(req: NextApiRequest, res: NextApiResponse) {
  try {
    const placeData = req.body
    const place = await placeService.create(placeData)
    res.status(201).json(place)
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
