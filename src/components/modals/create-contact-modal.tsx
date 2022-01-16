import React, { useEffect, useState } from 'react';
import { Modal } from './modal'
import { Button } from '../button';
import { observer } from "mobx-react-lite"
import { Colors } from '../../interface';
import { api } from '../../utils/api';
import { useStore } from '../../store/use-store';
import { Loader } from '../loader';
import { ErrorText, TextInput } from '../forms/typography';
import * as EmailValidator from 'email-validator';
import { v4 as uuidv4 } from 'uuid';


export const CreateModal = observer(({onClose}:{onClose:()=> void}) => {
    const store = useStore()
    const token = localStorage.getItem('token')
    const [loader, setLoader] = useState(false)
    const [name, setName] = useState('')
    const [email, setMail] = useState('')
    const [phone, setPhone] = useState('')
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
                <h3 style={{textAlign:'center', marginTop:48}}>Create new contact</h3>
                <div className="flex-column">
                    <TextInput 
                        value={name} 
                        type='text' 
                        placeholder='Enter name'
                        onChange={(e) => {
                            setName(e.target.value)
                            setNameError('')
                        }}
                    />
                    <ErrorText>{nameError}</ErrorText>
                    <TextInput 
                        value={phone} 
                        type='text' 
                        placeholder='Enter phone number'
                        onChange={(e) => {
                            setPhone(e.target.value)
                            setNameError('')
                        }}
                    />
                    <ErrorText>{phoneError}</ErrorText>
                    <TextInput 
                        value={email} 
                        type='text'
                        placeholder='Enter email address' 
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
                        if(!nameError && !phoneError && !mailError){
                            try {
                                setLoader(true)
                                await api.createContact({name, email, phone, id: uuidv4()})
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
                        }
                    }}
                >
                    {loader ? <Loader /> : 'Submit'}
                </Button>
            </div>
        </Modal>
    )
})

