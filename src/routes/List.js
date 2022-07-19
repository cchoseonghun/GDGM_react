import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

import Navs from './Navs.js';

function List(){
    let [list, setList] = useState( [] );

    useEffect(()=>{
        getList();
    }, [])

    return (
        <>
        <Navs />
        {
            list.map((a, i)=>{
                return (
                    <h1 key={i}><Badge bg="success" onClick={()=>{alert('레이드정보노출')}}>{a.name}</Badge></h1>
                )
            })
        }
        </>
    )

    function getList(){
        let session_user = JSON.parse(localStorage.getItem('session_user'));

        // axios.get('http://192.168.219.103:8080/list', {
        axios.get('http://localhost:8080/list', {
            params: { _id: session_user._id,  }
        }).then((result)=>{
            setList(result.data);
        }).catch(()=>{
            console.log('axios 통신실패')
        })
    }
}

export default List