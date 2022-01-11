import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../interface";
import { useStore } from "../../store/use-store";
import { SignInForm } from "./signin";
import { SignUpForm } from "./signup";

const FormWrapper = styled.div`
    width: 50%;
    padding: 24px;
    border: 2px solid ${Colors.MAIN};
    border-radius: 8px;
`

export const LoginForm = observer(() => {
    const store = useStore()
    const [form, setForm] = useState(store.formType)
    const isSignInForm = form === 'signin'

    useEffect(() => {
        setForm(store.formType)
    },[store.formType])

    return (
        <FormWrapper className="flex-column">
            {isSignInForm ? <SignInForm /> : <SignUpForm />}
        </FormWrapper>
    )
})