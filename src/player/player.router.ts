import express, { Router } from 'express';
import { body, param } from 'express-validator';
import { PlayerController } from './player.controller';

const router: Router = express.Router();
router.get('/', PlayerController.getIndex)

export = router;