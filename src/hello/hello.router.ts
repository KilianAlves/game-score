import express, { Router } from 'express';
import { HelloController } from './hello.controller';
import {helloRepository} from './hello.repository';
import { body } from 'express-validator';

const router: Router = express.Router();
router.get('/', HelloController.index);
router.post('/', express.json(), body("message").exists().isString(), HelloController.postIndex)
router.get('/world', HelloController.getHelloWorld);
router.get('/square/:num', HelloController.getSquare);

export = router;