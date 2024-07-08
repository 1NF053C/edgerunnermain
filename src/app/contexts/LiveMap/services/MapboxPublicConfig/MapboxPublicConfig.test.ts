import { Prisma, PrismaClient } from '@prisma/client';

import { listMapboxPublicConfigs } from './queries/listMapboxPublicConfigs';
import { getMapboxPublicConfig } from './queries/getMapboxPublicConfig';

import { createMapboxPublicConfig } from './commands/createMapboxPublicConfig';
import { updateMapboxPublicConfig } from './commands/updateMapboxPublicConfig';
import { deleteMapboxPublicConfig } from './commands/deleteMapboxPublicConfig';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

describe('MapboxPublicConfig', () => {
    beforeAll(async () => {
        await prisma.mapboxPublicConfig.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should return an empty list when there is no config', async () => {
        const configs = await listMapboxPublicConfigs();
        expect(configs).toEqual([]);
    });

    it('should create a new MapboxPublicConfig', async () => {
        const EXPECTED_STR = faker.string.uuid();
        const mbPubConf: Prisma.MapboxPublicConfigCreateInput = {
            publickey: EXPECTED_STR
        }

        const newConf = await createMapboxPublicConfig(mbPubConf);
        expect(newConf.publickey).toBe(EXPECTED_STR);
    });

    it('should seed the collection with 5 fake configs', async () => {
        const fakeConfigInputs = Array.from({ length: 5 }, () => {
            const mbPubConf: Prisma.MapboxPublicConfigCreateInput = {
                publickey: faker.string.uuid()
            }
            return mbPubConf;
        });

        for (const configInput of fakeConfigInputs) {
            await createMapboxPublicConfig(configInput)
        }

        const configs = await listMapboxPublicConfigs();
        expect(configs.length).toBe(6); // 5 new + 1 from previous test
    });

    it('should read a config', async () => {
        const configs = await listMapboxPublicConfigs();
        const firstConfigId = configs[0].id;

        const config = await getMapboxPublicConfig(firstConfigId);
        expect(config).toHaveProperty('id', firstConfigId);
    });

    it('should update a config', async () => {
        const configs = await listMapboxPublicConfigs();
        const firstConfigId = configs[0].id;

        const EXPECTED_STR = faker.string.uuid();
        const mbPubConf: Prisma.MapboxPublicConfigUpdateInput = {
            publickey: EXPECTED_STR
        }

        const updatedConfig = await updateMapboxPublicConfig(firstConfigId, mbPubConf);
        expect(updatedConfig).toHaveProperty('id', EXPECTED_STR);
    });

    it('should delete a config', async () => {
        const configs = await listMapboxPublicConfigs();
        const firstConfigId = configs[0].id;

        await deleteMapboxPublicConfig(firstConfigId);

        const latestConfigList = await listMapboxPublicConfigs();
        expect(latestConfigList.find(conf => conf.id === firstConfigId)).not.toBeDefined();
    });
});
