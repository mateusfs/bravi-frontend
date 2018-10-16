export class Person {
    id: string;
    name: string;
    sex: string;
    age: string;
    sync: boolean;

    constructor() {
    }

    static fromJson(data) {
        const person = Object.assign(new Person(), data);

        return person;
    }
}

var PersonRace = [
    { id: 'MALE', label: 'Masculino'},
	{ id: 'FEMALE', label: 'Feminino'},
	{ id: 'NEUTRAL', label: 'Neutro'}
];

export { PersonRace };