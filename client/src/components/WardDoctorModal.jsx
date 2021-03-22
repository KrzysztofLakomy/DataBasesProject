import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const WardDoctorModal = ({id}) => {
    const [modalShow, setModalShow] = useState(false);

    const [doctor,setDoctor] = useState("");
    const [doctors,setDoctors] = useState([]);

    let history = useHistory();
    const location = useLocation();

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/doctors/");
                setDoctors(response.data.data.doctor);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(doctor.toString().length===0 ){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post(`/wards/${id}/doctor`,{
                    id_lekarz: doctor,
                });
                if(response.status === 201){
                    alert("dodano lekarza");
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
                <td className="text-center"><button onClick={() => setModalShow(true)} type="button" className="btn btn-primary">Dodaj lekarza na oddzial</button></td>

                <Modal
                    show={modalShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Dodawanie lekarza
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action="">
                            <div className="row d-flex justify-content-center">
                                <div className="col-6">
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

export default WardDoctorModal
