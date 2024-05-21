import { faker } from "@faker-js/faker";
import { HelloData } from "./hello";
            
export function createHelloData(partialData?: Partial<HelloData>): HelloData {
    let msg = faker.lorem.text();
    if (partialData?.message != undefined) [
        msg = partialData?.message,
    ]
   
    return {
        message: msg,
    }
}