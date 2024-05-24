import express, { Router } from 'express';
import { body, param } from 'express-validator';
import { PlayerController } from './player.controller';

const router: Router = express.Router();
router.get('/', param('lastName').optional(), param('country').optional(), param('tour').optional(), PlayerController.getIndex)

export = router;