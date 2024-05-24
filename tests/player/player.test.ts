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
    test('GET /api/player?lastName=Snow', async () => {
        await playerRepository.clear();
        await playerRepository.insert(
            { firstName: "Caitlyn", lastName: "Snow", tour: "WTA", country:"USA" },
            { firstName: "KillerFrost", lastName: "Snow", tour: "WTA", country:"USA" },
            { firstName: "Ippo", lastName: "Makunouchi", tour: "ATP", country: "JP" }
        ); 

        const response = await supertest(app).get("/api/player?lastName=Snow");

        expect(response.statusCode).toBe(200); 
        expect(response.body.length).toEqual(2);
        expect(response.body[0].firstName).toEqual("Caitlyn");
        expect(response.body[1].firstName).toEqual("KillerFrost"); 
    });
    test('GET /api/player?tour=wta&country=USA', async () => {
        await playerRepository.clear();
        await playerRepository.insert(
            { firstName: "Caitlyn", lastName: "Snow", tour: "WTA", country:"USA" },
            { firstName: "KillerFrost", lastName: "Snow", tour: "WTA", country:"USA" },
            { firstName: "Ippo", lastName: "Makunouchi", tour: "ATP", country: "JP" },
            { firstName: "John", lastName: "Constantine", tour: "ATP", country: "USA" },
        ); 

        const response = await supertest(app).get("/api/player?tour=atp&country=USA");

        expect(response.statusCode).toBe(200); 
        expect(response.body.length).toEqual(1);
        expect(response.body[0].tour).toEqual("ATP");
        expect(response.body[0].country).toEqual("USA"); 
    });
})