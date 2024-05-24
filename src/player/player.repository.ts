import { Collection, ObjectId } from "mongodb";
import { mongodb } from "../services/mongodb";
import {Player, Tour} from "./player" 
import { match } from "assert";

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

    async findAll(query: any) {
        let filter: any = Object.keys(query).length > 0 ? {$and: Object.keys(query).map((key) => {
            return { [key]: { $regex: query[key], $options: "i" } };
        })} : {};
        return await this._playerCollection.find(filter).toArray();
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