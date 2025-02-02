import { Collection, ObjectId } from "mongodb";
import { mongodb } from "../services/mongodb";
import { HelloData } from "./hello";


class HelloRepository {
    private _helloCollection: Collection<HelloData>
    
    constructor() {
        this._helloCollection = mongodb.collection<HelloData>('hello');
    } 

    public async clear() {
        await this._helloCollection.deleteMany({});
    }

    public async insert(...obj: HelloData[]) {
        await this._helloCollection.insertMany(obj);
    }

    public async findAll() {
        return await this._helloCollection.find({}).toArray();
    }
    public async findOne(id: ObjectId) {
        return await this._helloCollection.findOne({_id: id});
    }
    public async deleteOne(id: ObjectId) {
        return await this._helloCollection.deleteOne({_id: id});
    }
    public async populate(count: number, fixturesGenerator: (partialEntity?: Partial<HelloData>) => HelloData) : Promise<void> {
        await this.clear();
        for (let i = 0; i < count; i++) {
            await this.insert(fixturesGenerator());
        }
        return;
    }
}

export const helloRepository = new HelloRepository()