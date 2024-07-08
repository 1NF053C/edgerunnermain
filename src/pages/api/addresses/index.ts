import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { AddressService } from '@/pages/api/_services/factory/AddressService';

const prisma = new PrismaClient()
const addressService = new AddressService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getAddresses(req, res)
    case 'POST':
      return createAddress(req, res)
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function getAddresses(req: NextApiRequest, res: NextApiResponse) {
  const addresses = await addressService.findAll()
  res.status(200).json(addresses)
}

async function createAddress(req: NextApiRequest, res: NextApiResponse) {
  try {
    const addressData = req.body
    const address = await addressService.create(addressData)
    res.status(201).json(address)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
