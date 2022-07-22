import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../store/modalSlice';
import { Form, Button, Modal} from 'react-bootstrap';

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
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>공격대 그룹코드 (관리자에게 문의)</Form.Label>
                        <Form.Control id="code" type="text" autoFocus />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>닫기</Button>
                <Button variant="primary" onClick={()=>{
                    handleClose();
                    addGroup();
                }}>추가</Button>
            </Modal.Footer>
        </Modal>
    )

    function addGroup(){
        let code = document.querySelector('#code').value;
        console.log('code: ' + code);
    }
}

export default AddGroupModal