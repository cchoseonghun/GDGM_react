import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Badge } from 'react-bootstrap';

import Navs from './Navs.js';

function List(){
    let [list, setList] = useState( [] );

    useEffect(()=>{
        getList();
    }, [])

    return (
        <>
        <Navs />
        <Container className="mt-5">
            {
                list.length > 0 ?
                list.map( (a, i) => <h1 key={i}><Badge bg="success" onClick={()=>{alert('레이드정보노출')}}>{a.name}</Badge></h1> ) : 
                <h1>가입된 공격대가 없습니다.</h1>
            }
        </Container>
        </>
    )

    function getList(){
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

export default List