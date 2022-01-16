import React, { useState } from "react";
import styled from "styled-components";
import { Colors, IContact } from "../interface";
import chebo from '../assets/img/chebo.jpeg'
import phone from '../assets/img/phone.svg'
import mail from '../assets/img/mail.svg'
import trash from '../assets/img/trash-2.svg'
import edit from '../assets/img/edit-2.svg'
import { api } from "../utils/api";
import { ConfirmModal } from "./modals/confirm-modal";
import { EditModal } from "./modals/edit-contact-modal";

const ContactWrapper = styled.div`
    border: 3px solid ${Colors.GREY};
    border-radius: 8px;
    padding: 15px;
    width: 200px;
    position: relative;
    margin-right: 24px;
`
const ContactTitle = styled.h3`
    font-size: 18px;
    color: ${Colors.MAIN};
`
const Photo = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain;
`
const ContactRow = styled.div`
    align-items: center;
    margin-top: 12px;
    font-size: 12px;
`
const HandleBlock = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
`

export const Contact = ({contact}:{contact:IContact}) => {
    const [handle, setHandle] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    return (
        <ContactWrapper onMouseMove={() => setHandle(true)} onMouseLeave={() => setHandle(false)}>
            {confirmModal && <ConfirmModal contact={contact} onClose={()=> setConfirmModal(false)} />}
            {editModal && <EditModal contact={contact} onClose={()=> setEditModal(false)} />}
            <HandleBlock className="flex-row">
            {handle && 
            <>
                <img src={trash} alt="delete" onClick={() => setConfirmModal(true)} className="clickable" />
                <img src={edit} alt="edit" onClick={() => setEditModal(true)} className="clickable" style={{marginLeft: 8}} />
            </>
            }
            </HandleBlock>
            <ContactTitle>{contact.name}</ContactTitle>
            <Photo src={chebo} alt={contact.name} />
            <ContactRow className="flex-row">
                <img style={{marginRight: 10}} src={phone} alt='phone' />
                <p>{contact.phone}</p>
            </ContactRow>
            <ContactRow className="flex-row">
                <img style={{marginRight: 10}} src={mail} alt='mail' />
                <p>{contact.email}</p>
            </ContactRow>
        </ContactWrapper>
    )
}