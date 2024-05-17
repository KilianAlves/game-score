import { NextFunction, Request, Response } from "express";
import {helloRepository} from './hello.repository';

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
        console.log(req.body);
        const message = req.body.message;
        await helloRepository.insert({message: message});
        res.status(201).send({message: message});
    }
}