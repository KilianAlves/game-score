import { faker } from "@faker-js/faker";
import { Player } from "./player";

export function createPlayer(partialData?: Partial<Player>): Player {
    return {
        firstName: partialData?.firstName ?? faker.person.firstName(),
        lastName: partialData?.lastName ?? faker.person.lastName(),
        tour: partialData?.tour ?? faker.datatype.boolean() ? "ATP" : "WTA",
        country: partialData?.country ?? faker.location.countryCode('alpha-3'),
    }
    
}