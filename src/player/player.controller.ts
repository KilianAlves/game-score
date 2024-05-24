import { NextFunction, Request, Response } from "express";
import { playerRepository } from './player.repository';
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";

export class PlayerController {
    public static async getIndex(req: Request, res: Response) {

        const filter = req.query;

        res.status(200).send( await playerRepository.findAll(filter));
    }
}
