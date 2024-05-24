import { Collection, ObjectId } from "mongodb";
import { mongodb } from "../services/mongodb";
import {Player} from "./player" 

class PlayerRepository {
    private _playerCollection: Collection<Player>
    
    constructor() {
        this._playerCollection = mongodb.collection<Player>('hello');
    } 

    public async clear() {
        await this._playerCollection.deleteMany({});
    }

    public async insert(...obj: Player[]) {
        await this._playerCollection.insertMany(obj);
    }

    public async findAll() {
        return await this._playerCollection.find({}).toArray();
    }
}

export const playerRepository = new PlayerRepository()