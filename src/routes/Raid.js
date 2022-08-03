import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, Carousel, Card, Button, Dropdown, DropdownButton, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AddRaidModal from './modals/AddRaidModal';
import RaidMemberModal from './modals/RaidMemberModal';
import InviteCodeModal from './modals/InviteCodeModal';
import GroupMemberModal from './modals/GroupMemberModal';

import { setAlert } from '../store/alertSlice'
import { setRaid } from '../store/raidSlice';
import { setModalName, setShow, setRaid_id } from '../store/modalSlice';

function Raid(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const server_address = process.env.REACT_APP_SERVER_ADDRESS;
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    useEffect(()=>{
        getRaids();
    }, [])

    return (
        <>
        { state.alert.switch && <Alert key={state.alert.variant} variant={state.alert.variant}>{state.alert.message}</Alert> }
        <Container className="mt-5">
            <h1>{state.group.name}</h1>
            <div className="btn-group mb-2">
                <Button onClick={()=>{navigate('/')}} variant="outline-dark" >뒤로</Button>
                <Button className="ms-1" onClick={()=>{showModal('InviteCode')}} variant="outline-success" >초대코드</Button>
                <Button className="ms-1" onClick={()=>{showModal('GroupMember')}} variant="outline-success" >멤버</Button>
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
                                    {
                                        a.members.find(x => x.rank == 'master')._id == JSON.parse(localStorage.getItem('session_user'))._id ?
                                        <>
                                        <DropdownButton id="dropdown-basic-button" title={a.name}>
                                            <Dropdown.Item onClick={()=>{deleteRaid(a._id)}}>레이드삭제</Dropdown.Item>
                                        </DropdownButton>
                                        </> : 
                                        <Button variant="primary">{a.name}</Button>
                                    }
                                </Card.Title>
                                {getRaidStatusBtn(a)}
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
        { state.modal.modalName == 'GroupMember' && <GroupMemberModal /> }
        </>
    )

    function getRaidStatusBtn(a){
        let variant = 'warning';
        let content = '?/?';
        let dDay = calDday(a.d_date);

        if(a.members.filter(x => x.status == 'refused').length > 0){
            variant = 'danger';
            content = '진행불가';
        } else if(a.members.filter(x => x.status == 'standby').length == a.members.length && dDay == 0){
            variant = 'success';
            content = a.members.filter(x => x.status == 'standby').length + '/' + a.members.length;
        } else if(a.members.filter(x => x.status == 'standby').length > 0 && dDay == 0){
            variant = 'outline-success';
            content = a.members.filter(x => x.status == 'standby').length + '/' + a.members.length;
        } else if(a.members.filter(x => x.status == 'checked').length == a.members.length && dDay == 0){
            variant = 'outline-success';
            content = a.members.filter(x => x.status == 'standby').length + '/' + a.members.length;
        } else {
            variant = 'warning';
            content = a.members.filter(x => x.status == 'checked').length + '/' + a.members.length;
        }

        return (
            <Button onClick={()=>{
                showModal('RaidMember');
                dispatch(setRaid_id(a._id));
                }} variant={variant}>
            {content}
            </Button>
        )
    }

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
        axios.put(server_address + '/raid/member/status', {
            raid_id: raid_id, 
            user_id: user_id, 
            target_status: target_status, 
        }).then((result)=>{
            setTimeout(()=>{
                getRaids();
            }, 500)
        })
    }

    function showModal(modalName){
        dispatch(setModalName(modalName));
        dispatch(setShow(true));
    }

    function deleteRaid(raid_id){
        axios.delete(server_address + '/raid', {
            data: {
                raid_id: raid_id, 
                user_id: JSON.parse(localStorage.getItem('session_user'))._id, 
            }
        }).then((result)=>{
            // dispatch(setAlert({switch: true, variant: result.data.variant, message: result.data.message}));
            // setTimeout(()=>{
            //     dispatch(setAlert({switch: false, variant: '', content: ''}));
            // }, 10000);
            navigate(0)
        })
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