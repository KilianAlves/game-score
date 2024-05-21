import supertest from 'supertest';
import { app } from '../../src/app';
import { test } from '@jest/globals';
import {mongoClient} from '../../src/services/mongodb';
import { playerRepository } from "../../src/player/player.repository"

describe('Test /api/player', () => {
    test('GET /api/player/', async () => {
        // await playerRepository.clear();
        // await playerRepository.insert(
        //     { message: "hello" },
        //     { message: "world" },
        // ); 
        
        const response = await supertest(app).get("/api/player");
        
        expect(response.statusCode).toBe(200); 
        expect(response.body.length).toEqual(2);
        // expect(response.body[0].message).toEqual("hello");
        // expect(response.body[1].message).toEqual("world"); 
    });
})