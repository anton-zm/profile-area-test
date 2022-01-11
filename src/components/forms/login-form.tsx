import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../interface";
import { SignInForm } from "./signin";

const FormWrapper = styled.div`
    width: 50%;
    padding: 24px;
    border: 2px solid ${Colors.MAIN};
    border-radius: 8px;
`

export const LoginForm = observer(() => {
    return (
        <FormWrapper className="flex-column">
            <SignInForm />
        </FormWrapper>
    )
})