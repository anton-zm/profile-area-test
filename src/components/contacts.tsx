import { observer } from "mobx-react-lite";
import React from "react";
import { Colors } from "../interface";
import { Button } from "./button";
import { Content } from "./content-wrapper";
import { SearchForm } from "./forms/search-form";


export const Contacts = observer(() => {
    return (
        <div style={{marginTop:48}}>
            <Content>
                <div className="flex-row w100 between">
                    <SearchForm />
                    <Button 
                        fill={Colors.MAIN}
                        centered
                        width='20%' 
                        onClick={() => {}}
                    >
                        Add contact
                    </Button>
                </div>
                
            </Content>
        </div>
    )
})