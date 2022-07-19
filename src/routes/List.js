import axios from 'axios';
import { useState } from 'react';
import { Container, Navbar, Button, Nav, NavDropdown, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './../store/userSlice';

import Navs from './Navs.js';

function List(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    let session_user = JSON.parse(localStorage.getItem('session_user'));

    return (
        <>
        <Navs />
        <h2>리스트임</h2>
        </>
    )
}

export default List