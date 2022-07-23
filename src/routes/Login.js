import axios from 'axios';
import { useState } from 'react';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './../store/userSlice';

function Login(){
    // redux
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [inputName, setInputName] = useState('');

    return (
        <>
        <Container>
            <h1 onClick={()=>{navigate('/')}} className="mt-5">공대공머</h1>
            <InputGroup className="mb-3 mt-5">
                <Form.Control
                placeholder="이름 입력"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="name"
                onChange={(e)=>{ setInputName(e.target.value) }}
                />
            <Button variant="outline-primary" id="button-addon2" onClick={()=>{ loginFn() }}>
            시작
            </Button>
            </InputGroup>
        </Container>
        </>
    )

    function loginFn(){
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.post(server_address + '/login', {
            name: inputName, 
        }).then((result)=>{
            console.log(result.data.msg);
            if(parseInt(result.data.code) > 0){
                // dispatch(setLogin(result.data.data));
                localStorage.setItem('session_user', JSON.stringify(result.data.data));
                dispatch(setUser(1));
            }
        }).catch(()=>{
            console.log('axios 통신실패')
        })
    }
}

export default Login