import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { ErrorText, FormTitle, PromptText, TextInput } from "./typography";
import { Colors } from "../../interface";
import { Button } from "../button";
import { useStore } from "../../store/use-store";
import { api } from "../../utils/api";
import { hydrateUser } from "../../utils/hydrate";

export const SignInForm = observer(() => {
    const store = useStore()
    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [serverError, setServerError] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    
    const validation = ():boolean => {
        let isValid = false
        if(!name) {
            setNameError('Username is required!')
        }else{
            isValid = true
        }
        if(!password) {
            setPasswordError('Password is required!')
            isValid = false
        }else{
            isValid = true
        }
        return isValid
    }

    const Submit = async () => {
        validation();
        if(validation()){
            try {
                const response = await api.signIn(name, password)
                if(!response){
                    setServerError('Something went wrong. Try again later.')
                }else{
                    if(response.message){
                        setServerError(response.message)
                    }else{
                        localStorage.setItem('token', response.token)
                        store.setLogin(true)
                        store.setUser(hydrateUser(response.user))
                        setServerError('')
                    }
                }
            }catch(e){
                console.log(e)
            }
            
        }
    }

    const switchForm = () => {
        store.setFormType('signup')
    }
    
    return (
        <div className="flex-column centered">
            <FormTitle>Log in to your account</FormTitle>
            <TextInput 
                value={name} 
                type='text' 
                placeholder='Enter your username*'
                onChange={(e) => {
                    setName(e.target.value)
                    setNameError('')
                }}
            />
            <ErrorText>{nameError}</ErrorText>
            <TextInput 
                value={password} 
                type='password' 
                placeholder='Enter your password*'
                onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError('')
                }}
            />
            <ErrorText>{passwordError}</ErrorText>
            <Button 
                fill={Colors.MAIN}
                centered
                margin="32px 0 0"
                width='50%' 
                onClick={Submit}
            >
                Sign in
            </Button>
            <ErrorText>{serverError}</ErrorText>
            <PromptText>Don't have an account? <span onClick={switchForm}>Sign Up</span></PromptText>
        </div>
    )
})