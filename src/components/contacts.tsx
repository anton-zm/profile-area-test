import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Colors, IContact } from "../interface";
import { useStore } from "../store/use-store";
import { Button } from "./button";
import { Contact } from "./contact";
import { Content } from "./content-wrapper";
import { SearchForm } from "./forms/search-form";
import { CreateModal } from "./modals/create-contact-modal";

const ContactsHeadings = () => {
    const [modal, setModal] = useState(false)
    return (
        <div className="flex-row w100 between">
        {modal && <CreateModal onClose={()=> setModal(false)} />}
        <SearchForm />
        <Button 
            fill={Colors.MAIN}
            centered
            width='20%' 
            onClick={() => setModal(true)}
        >
            Add contact
        </Button>
    </div>
    )
}
    




export const Contacts = observer(() => {
    const store = useStore()
    const user = JSON.parse(store.user)
    const data = user.contacts

    return (
        <div style={{marginTop:48}}>
            <Content>
                <ContactsHeadings />
                <div style={{marginTop: 48}} className="flex-row wrap w100">
                    {data.map((e:IContact) => <Contact key={e.id} contact={e} />)}
                </div>
            </Content>
        </div>
    )
})