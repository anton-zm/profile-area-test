import axios from "axios";
import { IContact, ProjectApi } from "../interface";
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

    async getUser(token: string): Promise<any> {
        return fetch(`${config.server_url}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        }).then(res => {
            return res.json()
        }).then(res => {
            return {
                id: res.data._id,
                contacts: res.data.contacts,
                username: res.data.username
            }
        })
        .catch(e => console.log(e))
    }

    async createContact(contact: IContact): Promise<boolean> {
        try {
            const result = await axios.patch(`${config.server_url}/contacts`, {
                contact
            })
            
            return true
        }catch(e){
            console.log(e)
            return false
        }
    }

    async deleteContact(id: string): Promise<any> {
        const token = localStorage.getItem('token')
        try {
            fetch(`${config.server_url}/delete-contact/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
            }).then(res => {
                return res.json()
            }).then(res => console.log(res))
        }catch(e){
            console.log(e)
            return false
        }
    }

    async updateContact(contact: IContact): Promise<boolean> {
        const token = localStorage.getItem('token')
        try {
            fetch(`${config.server_url}/edit-contact`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({contact})
            }).then(res => {
                return res.json()
            })
        }catch(e){
            console.log(e)
            return false
        }
        return true
    }
}

export const api = new Api()