import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
function AddModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log('propsprops',props.data)
    const styles = {
        heading: {
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '17px',
            letterSpacing: '0em',
            textAlign: 'left'
        },
        subHeading: {

            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '13px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: '#616161',
            marginTop: '20px'
        },
        cancelButton: {
            backgroundColor: 'transparent',
            color: 'blue',
            border: 'none',
        },
        borderDesign: {
            border: '0',
            borderBottom: '1px solid #000000'
        },
        modalPaddingTop: {
            paddingTop: '25px'
        },
        addButton:{
            background: '#434FBC'
        }
    }
    return (
         
        <Modal
            {...props}
            size="md" 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
        >
            <Modal.Header style={styles.modalPaddingTop}>
                <Modal.Title id="contained-modal-title-vcenter" >
                    <div style={styles.heading}>Add Investment</div>
                    <div style={styles.subHeading}> Please enter the details of the investment.</div>
                </Modal.Title>


            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Control as="select" custom style={styles.borderDesign}>
                            <option hidden>Select Company</option>
                            {
                                props.data.investment.map(({company})=>(
                                    <option value={company.id}>{company.name}</option>
                                ))
                            }
                             
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword"  >
                        <Form.Control type="number" style={styles.borderDesign} placeholder="Investment Amount" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} style={styles.cancelButton}>Cancel</Button>
                <Button style={styles.addButton} onClick={props.onHide}>Add Company</Button>
            </Modal.Footer>
        </Modal>
         
    );
}

export default AddModal;