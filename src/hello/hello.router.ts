import express, { Router } from 'express';
import { HelloController } from './hello.controller';
import {helloRepository} from './hello.repository';

const router: Router = express.Router();
router.get('/', HelloController.index);
router.post('/', HelloController.postIndex)
router.get('/world', HelloController.getHelloWorld);
router.get('/square/:num', HelloController.getSquare);

export = router;