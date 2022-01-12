import { User } from "../interface";
import { v4 as uuidv4 } from 'uuid';

export const hydrateUser = (obj: Record<string, any>): User => {
    const contacts = obj.contacts.map((e:Record<string, any>) => {
        return {
            name: e.name,
            phone: e.phone,
            email: e.email,
            id : uuidv4()
        }
    })
    return {
        username: obj.username,
        id: obj._id,
        contacts
    }
}