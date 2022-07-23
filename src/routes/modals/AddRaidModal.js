import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../store/modalSlice';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRaidModal(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const handleClose = () => dispatch(setShow(false));

    return (
        <Modal 
            show={state.modal.show} 
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>레이드 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>레이드 이름</Form.Label>
                        <Form.Control id="raid_name" name="raid_name" type="text" autoFocus />
                        <Form.Label>디데이_날짜</Form.Label>
                        <Form.Control id="d_date" name="d_date" type="date" autoFocus />
                        <Form.Label>디데이_시간</Form.Label>
                        <Form.Control id="d_time" name="d_time" type="time" autoFocus />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>닫기</Button>
                <Button variant="primary" onClick={()=>{
                    handleClose();
                    addRaid();
                }}>추가</Button>
            </Modal.Footer>
        </Modal>
    )

    function addRaid(){
        let session_user = JSON.parse(localStorage.getItem('session_user'));

        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.post(server_address + '/raid', {
            raid_name: document.querySelector('input[name="raid_name"]').value, 
            d_date: document.querySelector('input[name="d_date"]').value, 
            d_time: document.querySelector('input[name="d_time"]').value, 
            group_id: state.group._id, 
            group_name: state.group.name, 
            master_id: session_user._id, 
            master_name: session_user.name, 
        }).then((result)=>{
            console.log(result.data.msg);
            if(result.data.code > 0){
                navigate('/raid');
            }
        })
    }
}

export default AddRaidModal