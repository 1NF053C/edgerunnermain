import { Address, MapboxPublicConfig, Place, Prisma, PrismaClient } from "@prisma/client";
import { BaseDbClient } from "./BaseDbClient";

export class AddressService extends BaseDbClient<Address, Prisma.AddressCreateInput, Prisma.AddressUpdateInput> {
    constructor(prisma: PrismaClient) {
        super(prisma, 'address')
    }
}

export class MapboxPublicConfigService extends BaseDbClient<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
    constructor(prisma: PrismaClient) {
        super(prisma, 'mapboxPublicConfig')
    }
}

export class PlaceService extends BaseDbClient<Place, Prisma.PlaceCreateInput, Prisma.PlaceUpdateInput> {
    constructor(prisma: PrismaClient) {
        super(prisma, 'place')
    }
}
