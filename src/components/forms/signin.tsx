import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ErrorText, FormTitle, PromptText, TextInput } from "./typography";
import { Colors } from "../../interface";
import { Button } from "../button";
import { useStore } from "../../store/use-store";

export const SignInForm = observer(() => {
    const store = useStore()
    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [serverError, setServerError] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isNameValid, setIsNameValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)

    const isValid = !isNameValid && !isPasswordValid

    useEffect(() => {
        if(password){
            setIsPasswordValid(true)
        }else{
            setIsPasswordValid(false)
        }
        if(name){
            setIsNameValid(true)
        }else{
            setIsNameValid(false)
        }
    },[password, name])

    const Submit = () => {
        if(!name)setNameError('Username is required!')
        if(!name)setPasswordError('Password is required!') 
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