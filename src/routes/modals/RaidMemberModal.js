import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Modal, Tab, Button, InputGroup, Form } from 'react-bootstrap';
import { setShow } from '../../store/modalSlice';


function RaidMemberModal(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();

    const handleClose = () => dispatch(setShow(false));

    return (
        <Modal 
            show={state.modal.show} 
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>레이드 멤버</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <ListGroup horizontal className="mb-3">
                        <ListGroup.Item action href="#link1">소속</ListGroup.Item>
                        <ListGroup.Item action href="#link2">대기</ListGroup.Item>
                    </ListGroup>
                    <Tab.Content>
                        <Tab.Pane eventKey="#link1">
                            <Button variant="danger">삭제</Button>
                            <ListGroup>
                                <ListGroup.Item action variant="success">Success</ListGroup.Item>
                                <ListGroup.Item action variant="danger">Danger</ListGroup.Item>
                                <ListGroup.Item action variant="warning">Warning</ListGroup.Item>
                                <ListGroup.Item action variant="light">Light</ListGroup.Item>
                            </ListGroup>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link2">
                            <Button variant="success">추가</Button>
                            <InputGroup>
                                <Form.Control
                                placeholder="이름검색"
                                name="name"
                                />
                            <Button variant="outline-primary" onClick={()=>{}}>검색</Button>
                            </InputGroup>
                            <ListGroup>
                                <ListGroup.Item action variant="light">Light</ListGroup.Item>
                                <ListGroup.Item action variant="light">Light</ListGroup.Item>
                                <ListGroup.Item action variant="light">Light</ListGroup.Item>
                                <ListGroup.Item action variant="light">Light</ListGroup.Item>
                                <ListGroup.Item action variant="light">Light</ListGroup.Item>
                                <ListGroup.Item action variant="light">Light</ListGroup.Item>
                            </ListGroup>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

                
            </Modal.Body>
        </Modal>
    )
}

export default RaidMemberModal