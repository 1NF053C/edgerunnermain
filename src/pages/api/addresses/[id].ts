import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import { AddressService } from '@/pages/api/_services/factory/AddressService';

const prisma = new PrismaClient();
const addressService = new AddressService(prisma);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            return getAddress(req, res, Number(id));
        case 'PUT':
            return updateAddress(req, res, Number(id));
        case 'DELETE':
            return deleteAddress(req, res, Number(id));
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function getAddress(req: NextApiRequest, res: NextApiResponse, id: number) {
    const address = await addressService.findOne(id);
    if (address) {
        res.status(200).json(address);
    } else {
        res.status(404).json({ message: 'Address not found' });
    }
}

async function updateAddress(req: NextApiRequest, res: NextApiResponse, id: number) {
    try {
        const addressData = req.body;
        const updatedAddress = await addressService.update(id, addressData);
        res.status(201).json(updatedAddress);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

async function deleteAddress(req: NextApiRequest, res: NextApiResponse, id: number) {
    await addressService.delete(id);
    res.status(204).end();
}
