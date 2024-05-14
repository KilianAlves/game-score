import supertest from 'supertest';
import { app } from '../../src/app';
import { test } from '@jest/globals';
import {mongoClient} from '../../src/services/mongodb';
import {helloCollection} from '../../src/hello/hello.repository';

describe('Test /api/hello', () => {
    test('GET /api/hello/world', async () => {
        const response = await supertest(app).get('/api/hello/world');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('hello');
    });
    test.each([
        {num: 1, result: 1},
        {num: 4, result: 16},
        {num: 5, result: 25},
        {num: 10, result: 100},
        {num: 12, result: 144}
    ])('GET /api/hello/square/5', async ({num, result}) => {
        const response = await supertest(app).get('/api/hello/square/' + num);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ result: result });
    });
    test('GET /api/hello/square/XYZ', async () => {
        const response = await supertest(app).get('/api/hello/square/XYZ');
        expect(response.statusCode).toBe(404);
    });
    test("GET /api/hello", async () => {
        await helloCollection.deleteMany({});
        await helloCollection.insertMany([
            { message: "hello" },
            { message: "world" },
        ]); 
        
        const response = await supertest(app).get("/api/hello");
        
        expect(response.statusCode).toBe(200); 
        expect(response.body.length).toEqual(2);
        expect(response.body[0].message).toEqual("hello");
        expect(response.body[1].message).toEqual("world"); 
    })
});

afterAll(async () => {
    await mongoClient.close();
})