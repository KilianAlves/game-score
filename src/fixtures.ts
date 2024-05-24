import 'dotenv/config';
import {createHelloData} from "./hello/hello.fixtures";
import {helloRepository} from './hello/hello.repository';
import { createPlayer } from './player/player.fixtures';
import { playerRepository } from './player/player.repository';

helloRepository.populate(20,createHelloData);
playerRepository.populate(20,createPlayer);