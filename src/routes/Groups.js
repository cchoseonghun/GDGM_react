import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Badge, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setGroup } from '../store/groupSlice';
import { setModalName, setShow } from '../store/modalSlice';
import AddGroupModal from './modals/AddGroupModal';

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
        <Container className="mt-5">
            <Button onClick={()=>{showModal('addGroup')}} variant="outline-primary" >공대추가</Button>
            {
                list.length > 0 ?
                list.map( (a, i) => 
                    <h1 key={i}>
                        {/* <Badge bg="success" onClick={()=>{selectGroup(a._id, a.name, a.members)}}>{a.name}</Badge> */}
                        <Button className="ms-1" onClick={()=>{selectGroup(a._id, a.name, a.members)}} variant="success" >{a.name}</Button>
                        <Button className="ms-1" onClick={()=>{showModal('GroupSetting')}} variant="outline-info" >세팅</Button>
                        <Button className="ms-1" onClick={()=>{showModal('GroupMember')}} variant="outline-success" >멤버</Button>
                    </h1> 
                    ) : 
                <h1>가입된 공격대가 없습니다.</h1>
            }
        </Container>
        { state.modal.modalName == 'addGroup' && <AddGroupModal /> }
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