import axios from 'axios';
import { useState } from 'react';
import { Container, Navbar, Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/userSlice';

let Navs = () => {
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    let session_user = JSON.parse(localStorage.getItem('session_user'));
    
    let navigate = useNavigate();

    return (
        <Navbar>
            <Container>
            <Navbar.Brand onClick={navigate('/')}>공대공머</Navbar.Brand>
            <Navbar.Text>
            접속id: <a href="#login">{session_user.id}</a>
            </Navbar.Text>
            {/* <Navbar.Toggle /> */}
            <Navbar.Collapse className="justify-content-end">
            <Button onClick={()=>{logout()}} className="ml-5" variant="outline-dark">로그아웃</Button>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )

    function logout(){
        localStorage.removeItem('session_user');
        dispatch(setUser(0));
    }
}

export default Navs