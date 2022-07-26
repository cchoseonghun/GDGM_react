import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, Carousel, Card, Button, Dropdown, DropdownButton, Badge } from 'react-bootstrap';
import axios from 'axios';
import { setModalName, setShow } from '../store/modalSlice';
import AddRaidModal from './modals/AddRaidModal';
import { useNavigate } from 'react-router-dom';

function Raid(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [list, setList] = useState( [] );

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    useEffect(()=>{
        getRaids();
    }, [])

    return (
        <>
        <Container className="mt-5">
            <Button onClick={()=>{navigate(-1)}} variant="outline-dark" >뒤로</Button>
            <h1>{state.group.name}</h1>
            <div className="btn-group mb-2">
                <Button className="ms-1" onClick={()=>{showModal('addRaid')}} variant="outline-primary" >NEW</Button>
                <Button className="ms-1" onClick={()=>{showModal('raidSetting')}} variant="outline-info" >세팅</Button>
                <Button className="ms-1" onClick={()=>{showModal('raidMember')}} variant="outline-success" >멤버</Button>
            </div>
            {
                list.length > 0 ?
                <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" interval={null} indicators={true}>
                {
                    list.map((a, i)=>{
                        return(
                            <Carousel.Item key={i}>
                            <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <DropdownButton id="dropdown-basic-button" title={a.name}>
                                        <Dropdown.Item onClick={()=>{showRaidMember(a.members)}}>레이드멤버</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>{deleteRaid(a._id)}}>레이드삭제</Dropdown.Item>
                                    </DropdownButton>
                                </Card.Title>
                                <Button variant="warning">2/{a.members.length}</Button>
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
        { state.modal.modalName == 'addRaid' && <AddRaidModal /> }
        </>
    )

    function showModal(modalName){
        dispatch(setModalName(modalName));
        dispatch(setShow(true));
    }

    function showRaidMember(a){
        console.log(a);
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
        axios.get(server_address + '/raid', {
            params: { group_id: group_id }
        }).then((result)=>{
            setList(result.data);
        })
    }
}

export default Raid