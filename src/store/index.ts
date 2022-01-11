import { makeAutoObservable } from "mobx"

export class Storage {
    _isLogged = false

    constructor() {
        makeAutoObservable(this)
    }

    
}



