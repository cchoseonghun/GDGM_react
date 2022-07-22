import { useDispatch, useSelector } from 'react-redux';
import Navs from './Navs';
import {setType} from '../store/navSlice';
import { useEffect } from 'react';

function Raid(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setType('raid'));
    }, [])

    return (
        <>
        <Navs />
        <h1>{state.raid.title}</h1>
        </>
    )
}

export default Raid