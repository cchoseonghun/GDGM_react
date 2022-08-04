import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Badge, Button, Alert, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setGroup } from '../store/groupSlice';
import { setModalName, setShow } from '../store/modalSlice';
import AddGroupModal from './modals/AddGroupModal';
import { setAlert } from '../store/alertSlice'

function Groups(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch(); 
    let navigate = useNavigate();

    let [list, setList] = useState( [] );

    useEffect(()=>{
        getGroups();
    }, [])

    return (
        <>
        { state.alert.switch && <Alert key={state.alert.variant} variant={state.alert.variant}>{state.alert.message}</Alert> }
        <Container className="mt-5">
            <div className="btn-group mb-2">
                <Button onClick={()=>{showModal('AddGroup')}} variant="outline-primary" >공대추가</Button>
            </div>
            <Card className="text-center" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <Card.Body>
                <div className='d-grid gap-2'>
                {
                    list.length > 0 ?
                    list.map( (a, i) => 
                        <Button key={i} onClick={()=>{selectGroup(a._id, a.name, a.members)}} variant="success" size="lg">{a.name}</Button>
                        ) : 
                        <Button variant="secondary" size="lg">가입된 공격대가 없습니다.</Button>
                }
                </div>
            </Card.Body>
            </Card>
        </Container>
        { state.modal.modalName == 'AddGroup' && <AddGroupModal /> }
        </>
    )

    function showModal(modalName){
        dispatch(setModalName(modalName));
        dispatch(setShow(true));
    }

    function selectGroup(_id, name, members){
        let group = {_id: _id, name: name, members: members};
        dispatch(setGroup(group));
        navigate('/raid');
    }

    function getGroups(){
        let session_user = JSON.parse(localStorage.getItem('session_user'));
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.get(server_address + '/list', {
            params: { _id: session_user._id,  }
        }).then((result)=>{
            setList(result.data);
        }).catch(()=>{
            console.log('axios 통신실패')
        })
    }
}

export default Groups