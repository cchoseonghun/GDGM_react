import { useDispatch, useSelector } from 'react-redux';
import Navs from './Navs';
import {setType} from '../store/navSlice';
import { useEffect, useState } from 'react';
import { Container, Carousel, Card, Button, Dropdown, DropdownButton, Badge } from 'react-bootstrap';
import axios from 'axios';

function Raid(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();

    const [index, setIndex] = useState(0);
    const [list, setList] = useState( [] );

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    useEffect(()=>{
        dispatch(setType('raid'));
        getRaids();
    }, [])

    return (
        <>
        <Navs />
        <Container className="mt-5">
            <h1>{state.group.name}</h1>
            {
                list.length > 0 ?
                <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" className="mt-3">
                {
                    list.map((a, i)=>{
                        return(
                            <Carousel.Item key={i}>
                            <Card className="text-center">
                            <Card.Body>
                                <Card.Title>
                                    <DropdownButton id="dropdown-basic-button" title={a.raid_name}>
                                        <Dropdown.Item href="#/action-1">레이드멤버</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">레이드삭제</Dropdown.Item>
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
        </>
    )

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
            return (<Badge bg="dark">D+{result}</Badge>);
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