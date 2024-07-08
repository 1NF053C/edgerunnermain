import { PrismaClient, Prisma, MapboxPublicConfig } from '@prisma/client'
import { CrudService } from './utils/CrudService';

export class MapboxPublicConfigService extends CrudService<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'place')
  }
}
