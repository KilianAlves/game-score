import supertest from 'supertest';
import { app } from '../../src/app';
import { test } from '@jest/globals';
        
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
});