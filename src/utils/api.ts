import { Contact, ProjectApi } from "../interface";

class Api implements ProjectApi {
    async signIn(name: string, password: string): Promise<string> {
        throw new Error('Not implemented yet')
    }

    async signUp(name: string, password: string): Promise<string> {
        throw new Error('Not implemented yet')
    }

    async getContacts(id: string): Promise<Contact[]> {
        throw new Error('Not implemented yet')
    }

    async createContact(contact: Contact): Promise<boolean> {
        throw new Error('Not implemented yet')
    }

    async deleteContact(id: string): Promise<boolean> {
        throw new Error('Not implemented yet')
    }

    async updateContact(contact: Contact): Promise<boolean> {
        throw new Error('Not implemented yet')
    }
}

export const api = new Api()