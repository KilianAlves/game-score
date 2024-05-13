import express, { Request, Response, NextFunction } from 'express';
        
export const app = express();

app.get('/api/hello/world', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Hello, world!' });
});