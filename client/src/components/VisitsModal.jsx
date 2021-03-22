import React from 'react'
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ClinicVisitsList from './ClinicVisitsList';



const VisitsModal = ({id, name}) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <td className="text-center"><button onClick={() => setModalShow(true)} type="submit" className="btn btn-primary">Lista wizyt</button></td>

            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Wizyty w poradni: {name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ClinicVisitsList id={id}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VisitsModal
