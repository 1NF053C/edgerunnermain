import { Prisma, Place, MapboxPublicConfig } from '@prisma/client';
import { HOST_PORT } from '../app/api-paths';
import { BaseApiClient } from './BaseApiClient';

export class PlaceService extends BaseApiClient<Place, Prisma.PlaceCreateInput, Prisma.PlaceUpdateInput> {
  constructor() {
    super(`${HOST_PORT}/api/places`);
  }
}

export class MapboxPublicConfigService extends BaseApiClient<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
  constructor() {
    super(`${HOST_PORT}/api/mapbox-public-config`);
  }
}

