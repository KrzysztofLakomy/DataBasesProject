import React from 'react'
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';


const OperationsModal = ({id,doctors}) => {
    const [modalShow, setModalShow] = useState(false);

    const [name,setName] = useState("");
    const [room,setRoom] = useState("")
    const [doctor,setDoctor] = useState("");

    let history = useHistory();
    const location = useLocation();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(name.toString().length===0 || room.toString().length===0 || doctor.toString().length===0 ){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post(`/wards/${id}/operation`,{
                    nazwa: name,
                    sala_operacyjna: room,
                    id_lekarz: doctor,
                });
                if(response.status === 201){
                    alert("dodano operacje");
                    history.push("/");
                    history.push(location.pathname)
                }
            }
        }catch(err){
            alert(err.response.data.data.err);
        }
    }
    

    return (
        <div>
            <>
                <td className="text-center"><button onClick={() => setModalShow(true)} type="button" className="btn btn-primary">Dodaj operacje na oddzial</button></td>

                <Modal
                    show={modalShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Dodawanie operacji
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form action="">
                    <div className="row">
                        <div className="col-4">
                            <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="nazwa operacji"/>
                        </div>
                        <div className="col-3">
                            <input onChange={(e) => setRoom(e.target.value)} type="text" className="form-control" placeholder="sala operacyjna"/>
                        </div>
                        <div className="col-3">
                            <>
                            <select value={doctor} onChange={(e) => setDoctor(e.target.value)}id="doc" className="form-select custom-select custom-select-lg">
                                <option value="" disabled hidden defaultValue>Wybor doktora</option>
                                {doctors && doctors.map(doc => {
                                    return (
                                        <option key={doc.id_lekarz} value={doc.id_lekarz}>{doc.imie} {doc.nazwisko}</option>
                                    );
                                })}
                            </select>
                            </>
                        </div>
                        
                        <div className="col-1">
                            <button onClick={handleSubmit} className="btn btn-primary" type="submit">Dodaj</button>
                        </div>
                    </div>
                </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalShow(false)}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default OperationsModal
