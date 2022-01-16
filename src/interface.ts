export enum Colors {
    MAIN = '#6d0786',
    GREY = '#5f5c5c'
}

export type FormType = 'signin' |  'signup'

export interface IContact {
    name: string,
    phone: string,
    email: string,
    id : string
}

export interface User {
    id: string,
    contacts: IContact[],
    username: string,
}

export interface ProjectApi {
    signIn(
        name: string,
        password: string
    ): Promise<string>

    signUp(
        name: string,
        password: string,
        setLogin: () => void
    ): Promise<boolean>

    getUser(token: string): Promise<User>

    createContact(contact: IContact): Promise<boolean>

    deleteContact(id: string): Promise<boolean>

    updateContact(contact: IContact): Promise<boolean>
}