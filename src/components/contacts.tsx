import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
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
    const [data, setData] = useState(user.contacts)

    useEffect(() => {
        const user = JSON.parse(store.user)
        setData(user.contacts)
    },[store.user])

    useEffect(() => {
        if(store.searchValue){
            const filteredData = user.contacts.filter((e: IContact) => {
                return e.name.toLowerCase().startsWith(store.searchValue.toLowerCase())
            })
            setData(filteredData)
        }else{
            setData(user.contacts)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.searchValue])

    return (
        <div style={{marginTop:48}}>
            <Content>
                <ContactsHeadings  />
                {data.length ? <div style={{marginTop: 48}} className="flex-row wrap w100">
                    {data.map((e:IContact) => <Contact key={e.id} contact={e} />)}
                </div> : <p style={{margin: '120px auto', textAlign: 'center'}}>You don't save any contacts yet</p>}
            </Content>
        </div>
    )
})