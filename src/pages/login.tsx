import React from "react";
import { observer } from "mobx-react-lite"
import { Header } from "../components/header";
import { Content } from "../components/content-wrapper";
import { LoginForm } from "../components/forms/login-form";

export const Login = observer(() => {
    return (
        <div>
            <Header />
            <Content style={{height:'90vh'}} className="flex-column centered">
                <LoginForm />
            </Content>
        </div>
    )
})