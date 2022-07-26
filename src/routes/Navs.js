import { useState } from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/userSlice';

function Navs(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    const navigate = useNavigate();    
    let session_user = JSON.parse(localStorage.getItem('session_user'));
    
    return (
        <>
        <Navbar>
            <Container>
                <Navbar.Brand onClick={()=>{navigate('/')}}>공대공머</Navbar.Brand>
                <Navbar.Text>
                접속id: <a href="#login">{session_user.name}</a>
                </Navbar.Text>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Button onClick={()=>{logout()}} className="ms-1" variant="outline-dark">로그아웃</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
            
    function logout(){
        localStorage.removeItem('session_user');
        dispatch(setUser(0));
        navigate('/');
    }
}

export default Navs