import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Modal, Tab, Button, InputGroup, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { setShow } from '../../store/modalSlice';
import { setAlert } from '../../store/alertSlice'



function RaidMemberModal(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();

    const server_address = process.env.REACT_APP_SERVER_ADDRESS;

    const handleClose = () => dispatch(setShow(false));
    let [raidMembers, setRaidMembers] = useState([]);
    let [selected, setSelected] = useState( {} );

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
                                    raidMembers?.map((a, i)=>{
                                        return (
                                            <ListGroup.Item key={i} action variant={transStatus(a.status)}>{a.name}</ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link2">
                            <Button onClick={addRaidMember} variant="success">추가</Button>
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
                                        if(raidMembers?.find( x => x._id == a._id )){
                                            return false;
                                        } else {
                                            return ( 
                                                <ListGroup.Item 
                                                    key={i} 
                                                    onClick={(e)=>{
                                                         setSelected({
                                                            user_id: e.target.dataset.id, 
                                                            user_name: e.target.innerHTML, 
                                                         })
                                                        }} 
                                                    action 
                                                    variant="light"
                                                    data-id={a._id}
                                                >
                                                {a.name}
                                                </ListGroup.Item>
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

    function addRaidMember(){
        axios.put(server_address + '/raid/member', {
            raid_id: state.modal.raid_id, 
            user_id: selected.user_id, 
            user_name: selected.user_name, 
        }).then((result)=>{
            dispatch(setAlert({switch: true, variant: result.data.variant, message: result.data.message}));
            setTimeout(()=>{
                dispatch(setAlert({switch: false, variant: '', content: ''}));
            }, 10000);
        })

    }

    function getRaidMembers(){
        let _id = state.modal.raid_id;
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