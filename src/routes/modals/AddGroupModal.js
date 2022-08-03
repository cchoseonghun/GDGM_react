import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../store/modalSlice';
import { Form, Button, Modal, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import { setAlert } from '../../store/alertSlice'

function AddGroupModal(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();

    const handleClose = () => dispatch(setShow(false));

    const server_address = process.env.REACT_APP_SERVER_ADDRESS;
    let session_user = JSON.parse(localStorage.getItem('session_user'));

    return (
        <Modal 
            size="sm" 
            show={state.modal.show} 
            onHide={handleClose}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>공격대 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                        <Form.Control
                        id="code"
                        placeholder="초대코드 입력 ex) ABCDE"
                        aria-label="초대코드 입력 ex) ABCDE"
                        aria-describedby="basic-addon2"
                        />
                        <Button 
                            variant="primary" 
                            onClick={()=>{
                                handleClose();
                                addGroup();
                            }
                        }>추가</Button>
                    </InputGroup>
                </Modal.Body>
        </Modal>
    )

    function addGroup(){
        let code = document.querySelector('#code').value;
        axios.post(server_address + '/group/member', {
            code: code, 
            user_id: session_user._id, 
            user_name: session_user.name, 
        }).then((result)=>{
            dispatch(setAlert({switch: true, variant: result.data.variant, message: result.data.message}));
            setTimeout(()=>{
                dispatch(setAlert({switch: false, variant: '', content: ''}));
            }, 10000)
        })
    }
}

export default AddGroupModal