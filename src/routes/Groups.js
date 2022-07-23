import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setType } from '../store/navSlice';
import { setGroup } from '../store/groupSlice';

import Navs from './Navs.js';

function Groups(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch(); 
    let navigate = useNavigate();

    let [list, setList] = useState( [] );

    useEffect(()=>{
        dispatch(setType('default'));
        getGroups();
    }, [])

    return (
        <>
        <Navs />
        <Container className="mt-5">
            {
                list.length > 0 ?
                list.map( (a, i) => <h1 key={i}><Badge bg="success" onClick={()=>{selectGroup(a._id, a.name)}}>{a.name}</Badge></h1> ) : 
                <h1>가입된 공격대가 없습니다.</h1>
            }
        </Container>
        </>
    )

    function selectGroup(_id, name){
        let group = {_id: _id, name: name};
        dispatch(setGroup(group));
        navigate('/raid')
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