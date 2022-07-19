import { useState } from 'react';
import { Form, Container, Badge, Button, Modal, Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';

function Navs(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    let session_user = JSON.parse(localStorage.getItem('session_user'));

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
        <Navbar>
            <Container>
                <Navbar.Brand>공대공머</Navbar.Brand>
                <Navbar.Text>
                접속id: <a href="#login">{session_user.id}</a>
                </Navbar.Text>
                {/* <Navbar.Toggle /> */}
                <Navbar.Collapse className="justify-content-end">
                <Button onClick={handleShow} variant="outline-primary" >공대추가</Button>
                <Button onClick={()=>{logout()}} className="ms-1" variant="outline-dark">로그아웃</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <AddModal />
        </>
    )

    function logout(){
        localStorage.removeItem('session_user');
        dispatch(setUser(0));
    }

    function AddModal(){
        return (
            <Modal 
                size="sm" 
                show={show} 
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title>공격대 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>공격대 그룹코드 (관리자에게 문의)</Form.Label>
                            <Form.Control id="code" type="text" autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>닫기</Button>
                    <Button variant="primary" onClick={()=>{
                        handleClose();
                        addGroup();
                    }}>추가</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function addGroup(){
        let code = document.querySelector('#code').value;
        console.log('code: ' + code);
    }
}

export default Navs