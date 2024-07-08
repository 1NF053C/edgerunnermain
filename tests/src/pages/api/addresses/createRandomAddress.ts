import { faker } from "@faker-js/faker";
import { /*Address,*/ Prisma } from "@prisma/client";

export function createRandomAddressCreateInput(): Prisma.AddressCreateInput {
    return {
        formatted: faker.location.streetAddress(true),
    }
}

export function createRandomAddressUpdateInput(): Prisma.AddressUpdateInput {
    return {
        formatted: faker.location.streetAddress(true),
    }
}

// export function createRandomAddressMock(): Address {
//     return {
//         id: faker.number.int(),
//         formatted: faker.location.streetAddress(true),
//     }
// }
