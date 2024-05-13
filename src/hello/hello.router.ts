import express, { Router } from 'express';
import { HelloController } from './hello.controller';

const router: Router = express.Router();
router.get('/world', (req, res) => {
    new HelloController().getHelloWorld(req, res);
});
router.get('/square/:num', (req, res) => {
    new HelloController().getSquare(req, res);
});

export = router;