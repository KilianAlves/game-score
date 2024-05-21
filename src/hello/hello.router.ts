import express, { Router } from 'express';
import { HelloController } from './hello.controller';
import {helloRepository} from './hello.repository';
import { body, param } from 'express-validator';

const router: Router = express.Router();
router.get('/', HelloController.index);
router.post('/', express.json(), body("message").exists().isString(), HelloController.postIndex)
router.get('/world', HelloController.getHelloWorld);
router.get('/square/:num', HelloController.getSquare);
router.get('/:id', param('id').isMongoId(), HelloController.getById)
router.delete('/:id', param('id').isMongoId(), HelloController.deleteById)

export = router;