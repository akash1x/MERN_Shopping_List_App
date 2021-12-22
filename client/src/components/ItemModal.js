import React from 'react'
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap'
import {addItem} from '../actions/itemActions'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
const ItemModal = () => {

    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const toggle=()=>{
        setModal(!modal)
    }

    const onChange=(e)=>{
        setName(e.target.value);
    }

    const onSubmit =(e)=>{
        e.preventDefault();
        const newItem={
            name:name
        }
        dispatch(addItem(newItem))
        //Close Modal
        toggle();

    }

    return (
        <div>
            <Button color="dark" style={{marginBottom:"2rem"}} onClick={toggle}>Add Item</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input type='text' name='name' id="item" placeholder='add shopping item' onChange={onChange}/>
                            <Button color='dark' style={{marginTop:"2rem"}} block>Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default ItemModal
