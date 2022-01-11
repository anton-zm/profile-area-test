import { makeAutoObservable } from "mobx"

export class Storage {
    _isLogged = false

    constructor() {
        makeAutoObservable(this)
    }

    setLogin(v:boolean){
        this._isLogged = v
    }

    get login(){
        return this._isLogged
    }
}



