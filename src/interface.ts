export enum Colors {
    MAIN = '#6d0786',
    GREY = '#5f5c5c'
}

export type FormType = 'signin' |  'signup'

export interface Contact {
    name: string,
    phone: string,
    email: string,
    id? : string
}

export interface User {
    id: string,
    contacts: Contact[],
    username: string,
}

export interface ProjectApi {
    signIn(
        name: string,
        password: string
    ): Promise<string>

    signUp(
        name: string,
        password: string
    ): Promise<boolean>

    getContacts(id: string): Promise<Contact[]>

    createContact(contact: Contact): Promise<boolean>

    deleteContact(id: string): Promise<boolean>

    updateContact(contact: Contact): Promise<boolean>
}