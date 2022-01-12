import React, { useEffect, useState } from "react";
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
const LogoutText = styled.p`
    font-weight: 200;
    color: ${Colors.GREY};
`
const UserText = styled.p`
    font-weight: normal;
    color: ${Colors.MAIN};
    margin-right: 24px;
`
const Logo = styled.p`
    font-size: 22px;
    color: ${Colors.MAIN};
    font-weight: 600;
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

const Logout = observer(() => {
    const store = useStore()
    const [username, setUsername] = useState('')

    useEffect(() => {
        const user = JSON.parse(store.user)
        setUsername(user.username)
    },[store.user])

    return (
        <div className="flex-row">
            <UserText>{username}</UserText>
            <LogoutText className="clickable" onClick={() => {
                    localStorage.clear()
                    store.setLogin(false)
                }} 
            >Log out</LogoutText>
        </div>
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
                    <Logo>My Contacts App</Logo>
                    {store.login ? <Logout /> : <FormSwitcher />}
                </HeaderContentWrapper>
            </Content>
        </HeaderWrapper>
    )
})

