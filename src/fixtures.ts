import 'dotenv/config';
import {createHelloData} from "./hello/hello.fixtures";
import {helloRepository} from './hello/hello.repository';

helloRepository.populate(20,createHelloData);