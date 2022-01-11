import styled from "styled-components"
import { Colors } from "../../interface"

export const FormTitle = styled.h2`
    font-size: 22px;
    color: ${Colors.MAIN};
    text-align: center;
    margin-bottom: 48px;
`
export const TextInput = styled.input`
    border: none;
    outline: none;
    padding: 15px;
    border-bottom: 1px solid ${Colors.MAIN};
    width: 100%;
    font-size: 18px;
`
export const ErrorText = styled.p`
    color: red;
    font-size: 16px;
    margin-bottom: 24px;
    margin-top: 12px;
    min-height: 18px;
`
export const PromptText = styled.p`
    color: ${Colors.GREY};
    margin-top: 24px;
        span {
            color: ${Colors.MAIN};
            cursor: pointer;
        }
`