import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import searchIcon from '../../assets/img/search.svg'
import { Colors } from "../../interface";

const SearchInput = styled.input`
    border: none;
    outline: none;
    width: 70%;
    font-size: 18px;
    border-bottom: 1px solid ${Colors.MAIN};
    margin-left: 15px;
    padding: 17px;
`

export const SearchForm = observer(() => {
    return (
        <div className="flex-row" style={{width: '70%', alignItems:'center'}}>
            <img style={{width: 30, height: 30}} src={searchIcon} alt='search' />
            <SearchInput type='text' placeholder= 'Enter name' onChange={() => {}} />
        </div>
    )
})