import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export function createFakeMapboxPublicConfigCreateInput(): Prisma.MapboxPublicConfigCreateInput {
    return {
        publicKey: faker.string.uuid(),
        startLng: faker.number.int(),
        startLat: 0 - faker.number.int(),
        zoomLevel: faker.number.int({ min: 1, max: 15 })
    }
}

export function createFakeMapboxPublicConfigUpdateInput(): Prisma.MapboxPublicConfigUpdateInput {
    return createFakeMapboxPublicConfigCreateInput(); // ok when no nested relations
}
