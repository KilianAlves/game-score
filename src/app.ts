import express, { Request, Response, NextFunction } from 'express';
import router from './hello/hello.router';

const routesHello = require('./hello/hello.router');
const routesPlayer = require('./player/player.router');

export const app = express();
app.use('/api/hello/', routesHello);
app.use('/api/player/', routesPlayer)

