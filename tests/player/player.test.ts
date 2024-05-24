import supertest from 'supertest';
import { app } from '../../src/app';
import { test } from '@jest/globals';
import {mongoClient} from '../../src/services/mongodb';
import { playerRepository } from "../../src/player/player.repository"

describe('Test /api/player', () => {
    test('GET /api/player/', async () => {
        await playerRepository.clear();
        await playerRepository.insert(
            { firstName: "Barry", lastName: "Allen", tour: "ATP", country:"USA" },
            { firstName: "Eobard", lastName: "Thawn", tour: "ATP", country:"USA" },
        ); 
        
        const response = await supertest(app).get("/api/player");
        
        expect(response.statusCode).toBe(200); 
        expect(response.body.length).toEqual(2);
        expect(response.body[0].firstName).toEqual("Barry");
        expect(response.body[1].firstName).toEqual("Eobard"); 
    });
})