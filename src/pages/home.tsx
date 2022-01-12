import React from "react";
import { observer } from "mobx-react-lite"
import { Header } from "../components/header";

export const Home = observer(() => {
    return (
        <>
        <Header />
        Hello world!!</>
    )
})