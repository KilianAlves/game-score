import express, { Router } from 'express';
import { HelloController } from './hello.controller';

const router: Router = express.Router();
router.get('/', (req, res) => {
    new HelloController().getHelloWorld(req, res);
});

export = router;