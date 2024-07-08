import { faker } from '@faker-js/faker';
import { Place, Prisma } from '@prisma/client';
import { /*createRandomAddressMock,*/ createRandomAddressCreateInput, createRandomAddressUpdateInput } from '../addresses/createRandomAddress';

export function createRandomPlaceCreateInput(): Prisma.PlaceCreateInput {
    return {
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        longitude: faker.number.float(),
        latitude: 0 - faker.number.float(),
        address: {
            create: createRandomAddressCreateInput()
        }
    };
}

export function createRandomPlaceUpdateInput(): Prisma.PlaceUpdateInput {
    return {
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        longitude: faker.number.float(),
        latitude: 0 - faker.number.float(),
        address: {
            update: createRandomAddressUpdateInput()
        }
    };
}

// export function createRandomPlaceMock(): Place {
//     return {
//         id: faker.number.int(),
//         name: faker.company.name(),
//         description: faker.lorem.sentence(),
//         longitude: faker.number.float(),
//         latitude: 0 - faker.number.float(),
//         addressId: createRandomAddressMock().id
//     };
// }
