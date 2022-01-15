import React from "react";
import { observer } from "mobx-react-lite"
import { Header } from "../components/header";
import { Contacts } from "../components/contacts";

export const Home = observer(() => {
    return (
        <>
            <Header />
            <Contacts />
        </>
    )
})