import { useDispatch, useSelector } from 'react-redux';
import Navs from './Navs';
import {setType} from '../store/navSlice';
import { useEffect, useState } from 'react';
import { Container, Carousel, Card, Button } from 'react-bootstrap';
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

            <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" className="mt-3">
                <Carousel.Item>
                    <Card className="text-center">
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                    </Card>
                </Carousel.Item>
                <Carousel.Item>
                <Card className="text-center">
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                    </Card>
                </Carousel.Item>
                <Carousel.Item>
                <Card className="text-center">
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                    </Card>
                </Carousel.Item>
                </Carousel>
        </Container>
        </>
    )

    function getRaids(){
        let group_id = state.group._id;
        console.log('group_id: ' + group_id);
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.get(server_address + '/raid', {
            params: { group_id: group_id }
        }).then((result)=>{
            console.log(result.data);
            setList(result.data);
        })
    }
}

export default Raid