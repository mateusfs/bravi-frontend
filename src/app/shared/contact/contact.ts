export class Contact {
    id: string;
    person: string;
    email: string;
    phone: boolean;
    cellphone: string;
    sync: boolean;

    constructor() {
    }

    static fromJson(data) {
        const contact = Object.assign(new Contact(), data);

        return contact;
    }
}
