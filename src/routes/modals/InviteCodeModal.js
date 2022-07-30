import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
import { setShow } from '../../store/modalSlice';
import { useEffect, useState } from "react";
import axios from 'axios';

function InviteCodeModal(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();

    const handleClose = () => dispatch(setShow(false));

    const server_address = process.env.REACT_APP_SERVER_ADDRESS;


    let [code, setCode] = useState('');

    useEffect(()=>{
        getCode();
    }, [])

    return (
        <Modal 
            size="sm" 
            show={state.modal.show} 
            onHide={handleClose}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>공격대 초대코드</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                    id="code"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    readOnly defaultValue={code}
                    />
                    <Button variant="primary" onClick={copyCode}>복사</Button>
                    {/* <Button variant="success" onClick={()=>{ }}>복사됨</Button> */}
                </InputGroup>
            </Modal.Body>
        </Modal>
    )

    function getCode(){
        axios.get(server_address + '/group/code', {
            params: { group_id: state.group._id,  }
        }).then((result)=>{
            console.log('get code from server');
            setCode(result.data.code);
        })
    }

    function copyCode(){

    }
}

export default InviteCodeModal