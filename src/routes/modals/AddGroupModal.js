import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../store/modalSlice';
import { Form, Button, Modal, InputGroup} from 'react-bootstrap';

function AddGroupModal(){
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();

    const handleClose = () => dispatch(setShow(false));

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
        console.log('code: ' + code);
    }
}

export default AddGroupModal