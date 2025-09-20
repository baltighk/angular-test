import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

@Injectable({
    providedIn: 'root'
})
export class GeneratorService {
    generatePersons(count: number): Array<{ name: string; birthYear: number; address: string }> {
        const persons = [];
        for (let i = 0; i < count; i++) {
            persons.push({
                name: faker.name.fullName(),
                birthYear: faker.number.int({ min: 1950, max: 2024 }),
                address: faker.address.streetAddress()
            });
        }
        return persons;
    }
}