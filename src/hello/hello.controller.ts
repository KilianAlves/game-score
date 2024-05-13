import { NextFunction, Request, Response } from "express";

export class HelloController {
    public getHelloWorld(req: Request, res: Response): void {
        res.status(200).json({ message: 'hello' });
    }

    public getSquare(req: Request, res: Response): void {
        const num: number = parseInt(req.params.num);
        res.status(200).json({ result: num * num });
    }
}