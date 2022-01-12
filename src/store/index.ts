import { makeAutoObservable } from "mobx"
import { FormType, User } from "../interface"

export class Storage {
    _isLogged = false
    _form = 'signin'
    _user = {}

    constructor() {
        makeAutoObservable(this)
    }

    setLogin(v:boolean){
        this._isLogged = v
    }
    setFormType(v:FormType){
        this._form = v
    }
    setUser(v:User){
        this._user = v
    }

    get login(){
        return this._isLogged
    }
    get formType(){
        return this._form
    }
    get user(){
        return JSON.stringify(this._user)
    }
}



