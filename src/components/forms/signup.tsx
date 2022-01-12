import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { ErrorText, FormTitle, PromptText, TextInput } from "./typography";
import { Colors } from "../../interface";
import { Button } from "../button";
import { useStore } from "../../store/use-store";
import { api } from "../../utils/api";

export const SignUpForm = observer(() => {
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
        }else if(name.length < 2) {
            setNameError('At least 2 characters, please.')
        }else{
            isValid = true
        }
        if(!password) {
            setPasswordError('Password is required!')
            isValid = false
        }else if(password.length < 6) {
            setPasswordError('At least 6 characters, please.')
            isValid = false
        }else{
            isValid = true
        }
        return isValid
    }

    const Submit = async () => {
        validation();
        if(validation()){
            const response = await api.signUp(name, password)
            if(response){
                setServerError('')
            }else{
                setServerError('Something went wrong. Try again later.')
            }
        }
    }

    const switchForm = () => {
        store.setFormType('signin')
    }
    
    return (
        <div className="flex-column centered">
            <FormTitle>Create your account!</FormTitle>
            <TextInput 
                value={name} 
                type='text' 
                placeholder='Enter your username. At least 2 characters*'
                onChange={(e) => {
                    setName(e.target.value)
                    setNameError('')
                }}
            />
            <ErrorText>{nameError}</ErrorText>
            <TextInput 
                value={password} 
                type='password' 
                placeholder='Enter your password. At least 6 characters*'
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
                Sign up
            </Button>
            <ErrorText>{serverError}</ErrorText>
            <PromptText>Have an account? <span onClick={switchForm}>Sign In</span></PromptText>
        </div>
    )
}) 