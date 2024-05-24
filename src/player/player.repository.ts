import { Collection, ObjectId } from "mongodb";
import { mongodb } from "../services/mongodb";
import {Player} from "./player" 

class PlayerRepository {
    private _playerCollection: Collection<Player>
    
    constructor() {
        this._playerCollection = mongodb.collection<Player>('player');
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

    public async populate(count: number, fixturesGenerator: (partialEntity?: Partial<Player>) => Player): Promise<void> {
        await this.clear();
        for (let i = 0; i < count; i++) {
            await this.insert(fixturesGenerator());
        }
        return;
    }
}

export const playerRepository = new PlayerRepository()