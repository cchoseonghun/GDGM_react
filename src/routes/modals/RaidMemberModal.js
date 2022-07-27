import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Modal, Tab, Button, InputGroup, Form } from 'react-bootstrap';
import { setShow } from '../../store/modalSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';


function RaidMemberModal(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();

    const handleClose = () => dispatch(setShow(false));
    let [raidMembers, setRaidMembers] = useState([]);

    useEffect(()=>{
        getRaidMembers();
    }, [])

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
                            <Button onClick={()=>{}} variant="danger">삭제</Button>
                            <ListGroup className="mt-2">
                                {
                                    raidMembers.map((a, i)=>{
                                        return (
                                            <ListGroup.Item key={i} action variant={transStatus(a.status)}>{a.name}</ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link2">
                            <Button variant="success">추가</Button>
                            {/* <InputGroup className="mt-2">
                                <Form.Control
                                placeholder="이름검색"
                                name="name"
                                />
                            <Button variant="outline-primary" onClick={()=>{}}>검색</Button>
                            </InputGroup> */}
                            <ListGroup className="mt-2">
                                { 
                                    state.group.members.map((a, i) => {
                                        if(raidMembers.find( x => x._id == a._id )){
                                            return false;
                                        } else {
                                            return ( 
                                                <ListGroup.Item key={i} action variant="light">{a.name}</ListGroup.Item>
                                            )
                                        }
                                    }) 
                                }
                            </ListGroup>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    )

    function getRaidMembers(){
        let _id = state.modal.raid_id;
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.get(server_address + '/raid', {
            params: { _id: _id }
        }).then((result)=>{
            setRaidMembers(result.data.members);
        })
    }

    function transStatus(status){
        switch(status) {
            case 'default': 
                return 'light'
                break;
            case 'checked': 
                return 'warning'
                break;
            case 'standby': 
                return 'success'
                break;
            case 'refused': 
                return 'danger'
                break;
        }
    }
}

export default RaidMemberModal