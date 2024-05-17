import supertest from 'supertest';
import { app } from '../../src/app';
import { test } from '@jest/globals';
import {mongoClient} from '../../src/services/mongodb';
import { helloRepository } from '../../src/hello/hello.repository';
import { response } from 'express';
import { ObjectId } from 'mongodb';
import { before } from 'node:test';

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
        await helloRepository.clear();
        await helloRepository.insert(
            { message: "hello" },
            { message: "world" },
        ); 
        
        const response = await supertest(app).get("/api/hello");
        
        expect(response.statusCode).toBe(200); 
        expect(response.body.length).toEqual(2);
        expect(response.body[0].message).toEqual("hello");
        expect(response.body[1].message).toEqual("world"); 
    });
    test("POST /api/hello", async () => {
        const response = await supertest(app).post('/api/hello').send({ message: "test"});
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toEqual("test");
    });
    test("POST /api/hello", async () => {
        const response = await supertest(app).post('/api/hello').send({ msg: "test" });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            "status": "error",
            "message": "Données invalides.",
        });
    });
    test("GET /api/hello/1", async () => {
        await helloRepository.insert(
            { _id: new ObjectId('1FA1245D1FA1245D1FA1245D'), message: "hello" },
        ); 
        const response = await supertest(app).post('/api/hello/1FA1245D1FA1245D1FA1245D');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("hello");
    });
});

afterAll(async () => {
    await mongoClient.close();
})