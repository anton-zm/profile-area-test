import axios from "axios";
import { Contact, ProjectApi } from "../interface";
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
            .then(res => {
                localStorage.setItem('user', JSON.stringify(hydrateUser(res.user)))
                localStorage.setItem('token', res.token)
                return res
            })
            .catch(e => {
                console.log(e)
            })
    }

    async signUp(name: string, password: string, setLogin: () => void): Promise<boolean> {
        try {
            const result = await axios.post(`${config.server_url}/signup`, {
                username: name,
                password
            })
            if(result.status === 200){
                const user = await this.signIn(name, password)
                console.log('logged as ' + user.user.username)
                setLogin()
            }
            return result.status === 200
        }catch(e){
            console.log(e)
            return false
        }
    }

    async getContacts(id: string, token: string): Promise<Contact[]> {
        return fetch(`${config.server_url}/contacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            return res
        }).catch(e => console.log(e))
    }

    async createContact(contact: Contact): Promise<boolean> {
        try {
            const result = await axios.patch(`${config.server_url}/contacts`, {
                id: contact.id
            })
            
            return true
        }catch(e){
            console.log(e)
            return false
        }
    }

    async deleteContact(id: string): Promise<boolean> {
        throw new Error('Not implemented yet')
    }

    async updateContact(contact: Contact): Promise<boolean> {
        throw new Error('Not implemented yet')
    }
}

export const api = new Api()