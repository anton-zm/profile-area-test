import { createContext, useContext } from 'react'
import { Storage } from '.'

export const Store = new Storage()
export const Ctx = createContext(Store)
export const useStore = () => useContext(Ctx)
