import React, { useState } from 'react';
import { Modal } from './modal'
import { Button } from '../button';
import { observer } from "mobx-react-lite"
import { Colors, IContact } from '../../interface';
import { api } from '../../utils/api';
import { useStore } from '../../store/use-store';
import { Loader } from '../loader';

export const ConfirmModal = observer(({contact, onClose}:{contact: IContact, onClose:()=> void}) => {
    const store = useStore()
    const token = localStorage.getItem('token')
    const [loader, setLoader] = useState(false)

    return (
        <Modal onClose={onClose} width='400px'>
            <div className='flex-column centered-align'>
                <h3 style={{textAlign:'center', marginTop:48}}>You are going to remove the contact. Are you sure?</h3>
                <Button
                    margin='32px auto 0' 
                    fill={Colors.MAIN}
                    centered
                    width='70%'
                    onClick={async () => {
                        try {
                            setLoader(true)
                            await api.deleteContact(contact.id)
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

