import axios from "axios";
import { Contact, ProjectApi, User } from "../interface";
import { config } from "../config";
import { hydrateUser } from "./hydrate";

class Api implements ProjectApi {

    async signIn(name: string, password: string): Promise<any> {
        return fetch(`${config.server_url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username: name, password }),
            })
            .then(res => res.json())
            .catch(e => {
                console.log(e)
            })
    }

    async signUp(name: string, password: string, setUser: (user:User) => void): Promise<boolean> {
        try {
            const result = await axios.post(`${config.server_url}/signup`, {
                username: name,
                password
            })
            if(result.status === 200){
                const user = await this.signIn(name, password)
                setUser(hydrateUser(user.user))
                localStorage.setItem('token', user.token)
            }
            return result.status === 200
        }catch(e){
            console.log(e)
            return false
        }
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