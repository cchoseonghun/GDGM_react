import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, Carousel, Card, Button, Dropdown, DropdownButton, Badge } from 'react-bootstrap';
import axios from 'axios';
import { setModalName, setShow, setRaid_id } from '../store/modalSlice';
import AddRaidModal from './modals/AddRaidModal';
import RaidMemberModal from './modals/RaidMemberModal';
import { useNavigate } from 'react-router-dom';
import { setRaid } from '../store/raidSlice';

function Raid(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const [index, setIndex] = useState(0);
    // const [list, setList] = useState( [] );

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    useEffect(()=>{
        getRaids();
    }, [])

    return (
        <>
        <Container className="mt-5">
            <h1>{state.group.name}</h1>
            <div className="btn-group mb-2">
                <Button onClick={()=>{navigate(-1)}} variant="outline-dark" >뒤로</Button>
                <Button className="ms-1" onClick={()=>{showModal('AddRaid')}} variant="outline-primary" >레이드추가</Button>
            </div>
            {
                state.raid.data.length > 0 ?
                <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" interval={null} indicators={true}>
                {
                    state.raid.data.map((a, i)=>{
                        return(
                            <Carousel.Item key={i}>
                            <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <DropdownButton id="dropdown-basic-button" title={a.name}>
                                        <Dropdown.Item onClick={()=>{deleteRaid(a._id)}}>레이드삭제</Dropdown.Item>
                                    </DropdownButton>
                                </Card.Title>
                                <Button onClick={()=>{
                                    showModal('RaidMember');
                                    dispatch(setRaid_id(a._id));
                                    }} variant="warning">2/{a.members.length}</Button>
                                <Card.Text>{a.d_date} {a.d_time} {getDday(a.d_date)}</Card.Text>
                                <Button variant="outline-success">수락</Button>
                                <Button variant="outline-danger">거절</Button>
                                <div className="mb-5"></div>
                            </Card.Body>
                            </Card>
                            </Carousel.Item>
                        )
                    })
                }
                </Carousel> : 
                <h2>등록된 레이드가 없습니다.</h2>
            }
        </Container>
        { state.modal.modalName == 'AddRaid' && <AddRaidModal getRaids={getRaids} /> }
        { state.modal.modalName == 'RaidMember' && <RaidMemberModal /> }
        </>
    )

    function showModal(modalName){
        dispatch(setModalName(modalName));
        dispatch(setShow(true));
    }

    function deleteRaid(raid_id){
        console.log('raid_id: ' + raid_id);
        alert('추후지원예정');
    }

    function getDday(targetDate){
        let dday = new Date(targetDate);
        let today = new Date();
        let gap = dday.getTime() - today.getTime();
        let result = Math.ceil(gap / (1000 * 60 * 60 * 24));
        if(result == 0) {
            return (<Badge bg="danger">D-DAY</Badge>);
        } else if(result > 0){
            return (<Badge bg="success">D-{result}</Badge>);
        } else {
            return (<Badge bg="dark">D+{-1*result}</Badge>);
        }
    }

    function getRaids(){
        let group_id = state.group._id;
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.get(server_address + '/raids', {
            params: { group_id: group_id }
        }).then((result)=>{
            // setList(result.data);
            dispatch(setRaid(result.data));
        })
    }

}

export default Raid