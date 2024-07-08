import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { createRandomPlaceCreateInput, createRandomPlaceUpdateInput } from './createRandomPlace';

const prisma = new PrismaClient();
const baseUrl = `http://localhost:${process.env.PORT || 3000}/api`;

describe('Place API', () => {
  beforeAll(async () => {
    // Clear all places
    await prisma.place.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should clear all places', async () => {
    const response = await request(baseUrl).get('/places');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new place', async () => {
    const newPlace = createRandomPlaceCreateInput();

    const response = await request(baseUrl)
      .post('/places')
      .send(newPlace);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newPlace.name);
  });

  it('should seed the collection with 5 fake places', async () => {
    const fakePlaces = Array.from({ length: 5 }, () => (createRandomPlaceCreateInput()));

    for (const place of fakePlaces) {
      await request(baseUrl)
        .post('/places')
        .send(place);
    }

    const response = await request(baseUrl).get('/places');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(6); // 5 new + 1 from previous test
  });

  it('should read an place', async () => {
    const response = await request(baseUrl).get('/places');
    const placeId = response.body[0].id;

    const getResponse = await request(baseUrl).get(`/places/${placeId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('id', placeId);
  });

  it('should update an place', async () => {
    const response = await request(baseUrl).get('/places');
    const placeId = response.body[0].id;

    const updatedPlace = createRandomPlaceUpdateInput();

    const putResponse = await request(baseUrl)
      .put(`/places/${placeId}`)
      .send(updatedPlace);

    expect(putResponse.status).toBe(201);
    expect(putResponse.body).toHaveProperty('id', placeId);
    expect(putResponse.body.description).toBe(updatedPlace.description);
  });

  it('should delete an place', async () => {
    const response = await request(baseUrl).get('/places');
    const placeId = response.body[0].id;

    const deleteResponse = await request(baseUrl).delete(`/places/${placeId}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(baseUrl).get(`/places/${placeId}`);
    expect(getResponse.status).toBe(404);
  });
});
