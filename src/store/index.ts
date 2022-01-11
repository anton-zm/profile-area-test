import { makeAutoObservable } from "mobx"
import { FormType } from "../interface"

export class Storage {
    _isLogged = false
    _form = 'signin'

    constructor() {
        makeAutoObservable(this)
    }

    setLogin(v:boolean){
        this._isLogged = v
    }
    setFormType(v:FormType){
        this._form = v
    }

    get login(){
        return this._isLogged
    }
    get formType(){
        return this._form
    }
}



