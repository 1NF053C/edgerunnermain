import { Prisma, PrismaClient } from '@prisma/client';
import { MapboxPublicConfigService } from '@/utils/ApiClientFactory';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const mapboxPublicConfigService = new MapboxPublicConfigService();

describe('MapboxPublicConfig', () => {
    beforeAll(async () => {
        await prisma.mapboxPublicConfig.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should return an empty list when there is no config', async () => {
        const configs = await mapboxPublicConfigService.findAll();
        expect(configs).toEqual([]);
    });

    it('should create a new MapboxPublicConfig', async () => {
        const EXPECTED_STR = faker.string.uuid();
        const mbPubConf: Prisma.MapboxPublicConfigCreateInput = {
            publickey: EXPECTED_STR
        }

        const newConf = await mapboxPublicConfigService.create(mbPubConf);
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
            await mapboxPublicConfigService.create(configInput)
        }

        const configs = await mapboxPublicConfigService.findAll();
        expect(configs.length).toBe(6); // 5 new + 1 from previous test
    });

    it('should read a config', async () => {
        const configs = await mapboxPublicConfigService.findAll();
        const firstConfigId = configs[0].id;

        const config = await mapboxPublicConfigService.findOne(firstConfigId);
        expect(config).toHaveProperty('id', firstConfigId);
    });

    it('should update a config', async () => {
        const configs = await mapboxPublicConfigService.findAll();
        const firstConfigId = configs[0].id;

        const EXPECTED_STR = faker.string.uuid();
        const mbPubConf: Prisma.MapboxPublicConfigUpdateInput = {
            publickey: EXPECTED_STR
        }

        const updatedConfig = await mapboxPublicConfigService.update(firstConfigId, mbPubConf);
        expect(updatedConfig).toHaveProperty('id', EXPECTED_STR);
    });

    it('should delete a config', async () => {
        const configs = await mapboxPublicConfigService.findAll();
        const firstConfigId = configs[0].id;

        await mapboxPublicConfigService.delete(firstConfigId);

        const latestConfigList = await mapboxPublicConfigService.findAll();
        expect(latestConfigList.find(conf => conf.id === firstConfigId)).not.toBeDefined();
    });
});
