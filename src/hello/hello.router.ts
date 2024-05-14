import express, { Router } from 'express';
import { HelloController } from './hello.controller';
import {helloCollection} from './hello.repository';

const router: Router = express.Router();
router.get('/', HelloController.index);
router.get('/world', HelloController.getHelloWorld);
router.get('/square/:num', HelloController.getSquare);

export = router;