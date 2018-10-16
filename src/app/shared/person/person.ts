export class Person {
    id: string;
    name: string;
    sex: string;
    age: string;

    constructor() {
    }

    static fromJson(data) {
        const person = Object.assign(new Person(), data);

        return person;
    }
}

export interface PersonRace {
    male: 'M',
    female: 'F',
    neutral: 'N',
};
