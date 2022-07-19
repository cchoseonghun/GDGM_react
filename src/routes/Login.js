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

    let [inputId, setInputId] = useState('');

    return (
        <>
        <Container>
            <h1 onClick={()=>{navigate('/')}} className="mt-5">공대공머</h1>
            <InputGroup className="mb-3 mt-5">
                <Form.Control
                placeholder="닉네임 입력"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="id"
                onChange={(e)=>{ setInputId(e.target.value) }}
                />
            <Button variant="outline-primary" id="button-addon2" onClick={()=>{ loginFn() }}>
            시작
            </Button>
            </InputGroup>
        </Container>
        </>
    )

    function loginFn(){
        // axios.post('/login', {
        axios.post('http://192.168.219.103:8080/login', {
        // axios.post('http://localhost:8080/login', {
            id: inputId, 
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