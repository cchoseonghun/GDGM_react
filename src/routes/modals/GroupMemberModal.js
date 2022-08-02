import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Modal, Tab, Button, InputGroup, Form } from 'react-bootstrap';
import { setShow } from '../../store/modalSlice';

function GroupMemberModal(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();

    const server_address = process.env.REACT_APP_SERVER_ADDRESS;

    const handleClose = () => dispatch(setShow(false));

    return (
        <Modal 
            show={state.modal.show} 
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>공격대 멤버</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <Button onClick={()=>{}} variant="danger">삭제</Button> */}
                <ListGroup className="mt-2">
                    {
                        state.group.members.map((a, i)=>{
                            return (
                                <ListGroup.Item key={i} action>{a.name}</ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>

            </Modal.Body>
        </Modal>
    )
}

export default GroupMemberModal