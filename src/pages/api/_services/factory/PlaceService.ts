import { PrismaClient, Prisma, Place } from '@prisma/client'
import { CrudService } from './utils/CrudService';

export class PlaceService extends CrudService<Place, Prisma.PlaceCreateInput, Prisma.PlaceUpdateInput> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'place')
  }
}
