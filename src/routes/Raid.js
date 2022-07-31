import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, Carousel, Card, Button, Dropdown, DropdownButton, Badge } from 'react-bootstrap';
import axios from 'axios';
import { setModalName, setShow, setRaid_id } from '../store/modalSlice';
import AddRaidModal from './modals/AddRaidModal';
import RaidMemberModal from './modals/RaidMemberModal';
import InviteCodeModal from './modals/InviteCodeModal';
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
                <Button onClick={()=>{navigate('/')}} variant="outline-dark" >뒤로</Button>
                <Button className="ms-1" onClick={()=>{showModal('InviteCode')}} variant="outline-success" >초대코드</Button>
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
                                <Card.Text>{a.d_date} {a.d_time} {getDdayTag(a.d_date)}</Card.Text>
                                {getBtn(a.members, a.d_date, a._id)}
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
        { state.modal.modalName == 'InviteCode' && <InviteCodeModal /> }
        </>
    )

    function getBtn(members, targetDate, _id){
        // 통신이슈인지 members를 못받아온 상태일때가 있어 optional chaining 연산자 사용 (?.)
        let status = members.find( x => x._id == JSON.parse(localStorage.getItem('session_user'))._id)?.status;  
        let dDay = calDday(targetDate);  // 0: D-Day, <0: 날짜지남, >0: D-?

        if(dDay < 0){
            return (<div><Button variant="secondary" disabled>날짜지남</Button></div>)
        } else {
            if(status === 'default'){
                return (
                    <>
                    <div><Button onClick={()=>{changeStatus(_id, 'checked')}} variant="outline-warning">일정확인</Button></div>
                    <div><Button onClick={()=>{changeStatus(_id, 'refused')}} variant="outline-danger">참여불가</Button></div>
                    </>
                )
            } else if(status === 'checked'){
                if(dDay == 0){
                    return (
                        <>
                        <div><Button onClick={()=>{changeStatus(_id, 'standby')}} variant="outline-success">대기확인</Button></div>
                        <div><Button onClick={()=>{changeStatus(_id, 'refused')}} variant="outline-danger">참여불가</Button></div>
                        </>
                    )
                } else {
                    <div><Button onClick={()=>{changeStatus(_id, 'default')}} variant="outline-secondary">선택취소</Button></div>
                }
            } else if(status === 'standby'){
                return (
                    <div><Button onClick={()=>{changeStatus(_id, 'checked')}} variant="outline-secondary">선택취소</Button></div>
                )
            } else if(status === 'refused'){
                return (
                    <div><Button onClick={()=>{changeStatus(_id, 'default')}} variant="outline-secondary">선택취소</Button></div>
                )
            }
        }
    }

    function changeStatus(raid_id, target_status){
        let user_id = JSON.parse(localStorage.getItem('session_user'))._id;
        // raid_id, user_id, target_status 로 유저 상태변경하는 ajax
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.put(server_address + '/raid/member/status', {
            raid_id: raid_id, 
            user_id: user_id, 
            target_status: target_status, 
        }).then((result)=>{
            console.log(result.data.msg);
            // 소속, 대기 명단 최신화.. 랑 modal 닫았을 때 인원버튼, status 최신화
            // 버튼은 됐나?
        })
    }

    function showModal(modalName){
        dispatch(setModalName(modalName));
        dispatch(setShow(true));
    }

    function deleteRaid(raid_id){
        console.log('raid_id: ' + raid_id);
        alert('추후지원예정');
    }

    function calDday(targetDate){
        let dday = new Date(targetDate);
        let today = new Date();
        let gap = dday.getTime() - today.getTime();
        let result = Math.ceil(gap / (1000 * 60 * 60 * 24));
        return result;
    }

    function getDdayTag(targetDate){
        let result = calDday(targetDate);
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
        let session_user = JSON.parse(localStorage.getItem('session_user'));
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.get(server_address + '/raids', {
            params: { 
                group_id: group_id, 
                user_id: session_user._id, 
            }
        }).then((result)=>{
            // setList(result.data);
            dispatch(setRaid(result.data));
        })
    }

}

export default Raid