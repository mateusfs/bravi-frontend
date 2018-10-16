export class Contact {
    email: string;
    phone: boolean;
    cellphone: string;

    constructor() {
    }

    static fromJson(data) {
        const contact = Object.assign(new Contact(), data);

        return contact;
    }
}
