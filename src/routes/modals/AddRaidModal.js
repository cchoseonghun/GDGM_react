import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../store/modalSlice';
import { Form, Button, Modal } from 'react-bootstrap';

function AddRaidModal(){
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
                <Modal.Title>레이드 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>레이드 추가 폼 만들어야함</Form.Label>
                        <Form.Control id="code" type="text" autoFocus />
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
        let code = document.querySelector('#code').value;
        console.log('code: ' + code);
    }
}

export default AddRaidModal