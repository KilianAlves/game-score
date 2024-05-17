import { NextFunction, Request, Response } from "express";
import {helloRepository} from './hello.repository';
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";

export class HelloController {
    public static getHelloWorld(req: Request, res: Response): void {
        res.status(200).json({ message: 'hello' });
    }

    public static getSquare(req: Request, res: Response): void {
        if (isNaN(parseInt(req.params.num))) {
            res.status(404).json({ message: 'Invalid input, number required' });
            return;
        }
        const num: number = parseInt(req.params.num);
        res.status(200).json({ result: num * num });
    }
    public static index(req: Request, res: Response): void {
        res.send([
            { message: "hello"},
            { message: "world"}
        ])
    }
    public static async postIndex(req: Request, res: Response): Promise<void> {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({
                "status": "error",
                "message": "Données invalides.",
            })
            return;
        }

        const message = req.body;
        
        await helloRepository.insert(message);
        res.status(201).json(message);
    }
    public static async getById(req: Request, res: Response): Promise<void> {
        console.log("1");

        const id = req.query.id as string;
        console.log("2");

        const objectId = new ObjectId(id);
        console.log("3");

        const helloObject = await helloRepository.findOne(objectId);
        console.log("4");
        res.status(200).json(helloObject);
    }
}