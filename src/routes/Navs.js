import { useState } from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/userSlice';
import { setModalName, setShow } from '../store/modalSlice';
import AddGroupModal from './modals/AddGroupModal';
import AddRaidModal from './modals/AddRaidModal';

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
                <Button className="ms-5" onClick={()=>{navigate(-1)}} variant="outline-dark" >뒤로</Button>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                {
                    state.nav.type === 'default' ?
                    <Button onClick={()=>{showModal('addGroup')}} variant="outline-primary" >공대추가</Button> :
                    <>
                    <Button className="ms-1" onClick={()=>{showModal('addRaid')}} variant="outline-primary" >NEW</Button>
                    <Button className="ms-1" onClick={()=>{showModal('raidSetting')}} variant="outline-info" >세팅</Button>
                    <Button className="ms-1" onClick={()=>{showModal('raidMember')}} variant="outline-success" >멤버</Button>
                    </>
                }
                <Button onClick={()=>{logout()}} className="ms-1" variant="outline-dark">로그아웃</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        { state.modal.modalName == 'addGroup' && <AddGroupModal /> }
        { state.modal.modalName == 'addRaid' && <AddRaidModal /> }
        </>
    )
            
    function showModal(modalName){
        dispatch(setModalName(modalName));
        dispatch(setShow(true));
    }

    function logout(){
        localStorage.removeItem('session_user');
        dispatch(setUser(0));
        navigate('/');
    }
}

export default Navs