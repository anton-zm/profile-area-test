import React, { useEffect, useState } from 'react';
import { Modal } from './modal'
import { Button } from '../button';
import { observer } from "mobx-react-lite"
import { Colors, IContact } from '../../interface';
import { api } from '../../utils/api';
import { useStore } from '../../store/use-store';
import { Loader } from '../loader';
import { ErrorText, TextInput } from '../forms/typography';
import * as EmailValidator from 'email-validator';

export const EditModal = observer(({contact, onClose}:{contact: IContact, onClose:()=> void}) => {
    const store = useStore()
    const token = localStorage.getItem('token')
    const [loader, setLoader] = useState(false)
    const [name, setName] = useState(contact.name)
    const [email, setMail] = useState(contact.email)
    const [phone, setPhone] = useState(contact.phone)
    const [nameError, setNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [mailError, setMailError] = useState('')

    useEffect(() => {
        if(!phone){
            setPhoneError('Phone is required')
        }else{
            setPhoneError('')
        }
        if(!email){
            setMailError('Mail is required')
        }else{
            setMailError('')
        }
        if(!EmailValidator.validate(email)){
            setMailError('It doesn\'t look like an email address')
        }else{
            setMailError('')
        }
        if(!name){
            setNameError('Name is required')
        }else{
            setNameError('')
        }
    },[email, name, phone])

    return (
        <Modal onClose={onClose} width='400px'>
            <div className='flex-column centered-align'>
                <h3 style={{textAlign:'center', marginTop:48}}>Edit contact</h3>
                <div className="flex-column">
                    <TextInput 
                        value={name} 
                        type='text' 
                        onChange={(e) => {
                            setName(e.target.value)
                            setNameError('')
                        }}
                    />
                    <ErrorText>{nameError}</ErrorText>
                    <TextInput 
                        value={phone} 
                        type='text' 
                        onChange={(e) => {
                            setPhone(e.target.value)
                            setNameError('')
                        }}
                    />
                    <ErrorText>{phoneError}</ErrorText>
                    <TextInput 
                        value={email} 
                        type='text' 
                        onChange={(e) => {
                            setMail(e.target.value)
                            setNameError('')
                        }}
                    />
                    <ErrorText>{mailError}</ErrorText>
                </div>
                <Button
                    margin='32px auto 0' 
                    fill={Colors.MAIN}
                    centered
                    width='70%'
                    onClick={async () => {
                        try {
                            setLoader(true)
                            await api.updateContact({name, email, phone, id: contact.id})
                            api.getUser(token!)
                                .then((res) => {
                                store.setUser(res)
                                localStorage.setItem('user', JSON.stringify(res))
                                onClose()
                            })
                        } catch(e){
                            console.log(e)
                        } finally {
                            setLoader(false)
                        }
                    }}
                >
                    {loader ? <Loader /> : 'Submit'}
                </Button>
            </div>
        </Modal>
    )
})

