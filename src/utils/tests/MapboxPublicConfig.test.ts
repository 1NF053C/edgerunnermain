import { PrismaClient } from '@prisma/client';
import { MapboxPublicConfigService } from '@/utils/ApiClientFactory';
import { createFakeMapboxPublicConfigCreateInput, createFakeMapboxPublicConfigUpdateInput } from './createFakeMapboxPublicConfig';

const prisma = new PrismaClient();
const mapboxPublicConfigService = new MapboxPublicConfigService();

describe('MapboxPublicConfig', () => {
    beforeAll(async () => {
        await prisma.mapboxPublicConfig.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    // See below for how to use api client services from ApiClientFactory
    // Usage is coupled to types generated from prisma models
    // Extend ApiClientFactory file to handle new models
    // DbClientFactory produces similar functionality, difference being it depends on prisma.model methods rather than http client methods
    // ApiClientFactory is for browserside, DbClientFactory is for serverside
    it('should return an empty list when there is no config', async () => {
        const configs = await mapboxPublicConfigService.findAll();
        expect(configs).toEqual([]);
    });

    it('should create a new MapboxPublicConfig', async () => {
        const mbPubConf = createFakeMapboxPublicConfigCreateInput();
        const newConf = await mapboxPublicConfigService.create(mbPubConf);
        expect(newConf.publicKey).toBe(mbPubConf.publicKey);
    });

    it('should seed the collection with 5 fake configs', async () => {
        const fakeConfigInputs = Array.from({ length: 5 }, createFakeMapboxPublicConfigCreateInput);

        for (const configInput of fakeConfigInputs) {
            await mapboxPublicConfigService.create(configInput);
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


        const mbPubConf = createFakeMapboxPublicConfigUpdateInput();

        const updatedConfig = await mapboxPublicConfigService.update(firstConfigId, mbPubConf);
        expect(updatedConfig).toHaveProperty('publicKey', mbPubConf.publicKey);
    });

    it('should delete a config', async () => {
        const configs = await mapboxPublicConfigService.findAll();
        const firstConfigId = configs[0].id;

        await mapboxPublicConfigService.delete(firstConfigId);

        const latestConfigList = await mapboxPublicConfigService.findAll();
        expect(latestConfigList.find(conf => conf.id === firstConfigId)).not.toBeDefined();
    });
});
