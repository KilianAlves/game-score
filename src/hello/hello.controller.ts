import { NextFunction, Request, Response } from "express";

export class HelloController {
    public getHelloWorld(req: Request, res: Response): void {
        res.status(200).json({ message: 'hello' });
    }
}