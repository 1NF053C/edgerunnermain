import { PrismaClient, Prisma, Address } from '@prisma/client'
import { CrudService } from './utils/CrudService';

export class AddressService extends CrudService<Address, Prisma.AddressCreateInput, Prisma.AddressUpdateInput> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'address')
  }
}
