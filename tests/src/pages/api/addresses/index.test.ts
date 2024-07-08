import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { createRandomAddressCreateInput, createRandomAddressUpdateInput } from './createRandomAddress';

const prisma = new PrismaClient();
const baseUrl = `http://localhost:${process.env.PORT || 3000}/api`;

describe('Address API', () => {
  beforeAll(async () => {
    // Clear all addresses
    await prisma.place.deleteMany()
    await prisma.address.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should clear all addresses', async () => {
    const response = await request(baseUrl).get('/addresses');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new address', async () => {
    const newAddress = createRandomAddressCreateInput();

    const response = await request(baseUrl)
      .post('/addresses')
      .send(newAddress);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.formatted).toBe(newAddress.formatted);
  });

  it('should seed the collection with 5 fake addresses', async () => {
    const fakeAddresses = Array.from({ length: 5 }, () => (createRandomAddressCreateInput()));

    for (const address of fakeAddresses) {
      await request(baseUrl)
        .post('/addresses')
        .send(address);
    }

    const response = await request(baseUrl).get('/addresses');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(6); // 5 new + 1 from previous test
  });

  it('should read an address', async () => {
    const response = await request(baseUrl).get('/addresses');
    const addressId = response.body[0].id;

    const getResponse = await request(baseUrl).get(`/addresses/${addressId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('id', addressId);
  });

  it('should update an address', async () => {
    const response = await request(baseUrl).get('/addresses');
    const addressId = response.body[0].id;

    const updatedAddress = createRandomAddressUpdateInput();

    const putResponse = await request(baseUrl)
      .put(`/addresses/${addressId}`)
      .send(updatedAddress);

    expect(putResponse.status).toBe(201);
    expect(putResponse.body).toHaveProperty('id', addressId);
    expect(putResponse.body.formatted).toBe(updatedAddress.formatted);
  });

  it('should delete an address', async () => {
    const response = await request(baseUrl).get('/addresses');
    const addressId = response.body[0].id;

    const deleteResponse = await request(baseUrl).delete(`/addresses/${addressId}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(baseUrl).get(`/addresses/${addressId}`);
    expect(getResponse.status).toBe(404);
  });
});
