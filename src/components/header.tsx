import React, { useEffect } from "react";
import styled from 'styled-components'
import { observer } from "mobx-react-lite";
import { Content } from "./content-wrapper";
import { Colors } from "../interface";
import { useStore } from "../store/use-store";

const HeaderWrapper = styled.header`
    border-bottom: 1px solid ${Colors.MAIN};
`

const HeaderContentWrapper = styled.div`
    padding: 24px 0;
`

const Logo = styled.p`
    font-size: 22px;
    color: ${Colors.MAIN};
`
const FormSwitcher = observer(() => {
    const store = useStore()
    const isSignInForm = store.formType === 'signin'
    const text = isSignInForm ? 'Sign Up' : 'Sign In'

    return (
        <p className="clickable" onClick={() => {
            const type = isSignInForm ? 'signup' : 'signin'
            store.setFormType(type)
        }}>{text}</p>
    )
})

export const Header = observer(() => { 
    const store = useStore()

    useEffect(() => {
        const user = JSON.parse(store.user)
        console.log(user)
    },[store.user])

    return (
        <HeaderWrapper>
            <Content>
                <HeaderContentWrapper className="flex-row between">
                    <Logo>My Contacts</Logo>
                    {store.login ? <p>Log out</p> : <FormSwitcher />}
                </HeaderContentWrapper>
            </Content>
        </HeaderWrapper>
    )
})

