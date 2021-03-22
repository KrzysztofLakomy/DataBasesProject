import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Hospital from '../apis/Hospital';
import DiseasesList from '../components/DiseasesList';
import NavBar from '../components/NavBar';
import { HospitalContext } from '../context/HospitalContext';

const PatientDetailPage = () => {
    const {id} = useParams();

    const {selectedPatient, setSelectedPatient} = useContext(HospitalContext);

    const [name,setName] = useState("");

    let history = useHistory();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(name.toString().length===0){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post(`/patients/${id}`,{
                    choroba: name,
                });
                if(response.status === 201){
                    alert("dodano chorobe");
                    history.push("/");
                    history.push(location.pathname);
                }
            }

        }catch(err){
            alert(err.response.data.data.err);
        }
    }

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get(`/patients/${id}`);
                setSelectedPatient(response.data.data);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    return (
        <div>
            <NavBar/>
            {selectedPatient && (
                <>
                    {selectedPatient.patient && (
                        <>
                            <h1 className="display-4 text-center font-weight-light mb-5">Pacjent: {selectedPatient.patient.imie} {selectedPatient.patient.nazwisko}</h1>
                            <table className="table table-hover mb-4">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col">Imie</th>
                                        <th scope="col">Nazwisko</th>
                                        <th scope="col">PESEL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={selectedPatient.patient.id_pacjent}>
                                        <td>{selectedPatient.patient.imie}</td>
                                        <td>{selectedPatient.patient.nazwisko}</td>
                                        <td>{selectedPatient.patient.pesel}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                    <h1 className="display-6 text-center font-weight-light ">Posiadane choroby</h1>
                    <div className="mb-5  d-flex justify-content-center">
                        <form action="">
                            <div className="row mt-2">
                                <div className="col">
                                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="choroba"/>
                                </div>
                                <div className="col-1">
                                    <button onClick={handleSubmit} className="btn btn-primary" type="submit">Dodaj</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {selectedPatient.diseases && (
                        <DiseasesList dis={selectedPatient.diseases}/>
                    )}


                    {selectedPatient.visits && (
                        <>
                            <h1 className="text-center display-6 font-weight-light mt-5 mb-4">Umowione wizyty ({selectedPatient.visits_num.count})</h1>
                            {selectedPatient.visits && selectedPatient.visits.map((visit) => {
                                return(
                                    <div className="row mx-5 d-flex justify-content-center">
                                        <div className="card hover text-white bg-primary mb-3 mr-4 col-7" style={{maxWidth: "40%"}} key={visit.godzina}>
                                            <div className="card-header d-flex justify-content-between">
                                                <h5 className="font-weight-light">lek. {visit.imie} {visit.nazwisko}</h5>
                                            </div>
                                            <div className="card-body"> 
                                                <p className="text-center">Poradnia: {visit.nazwa} ({visit.rodzaj})</p>
                                                <p className="text-center">Data: {visit.termin.substring(0,10)}</p>
                                                <p className="text-center">Godzina: {visit.godzina}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                    {selectedPatient.w_num && (
                        <h1 className="text-center mt-5 font-weight-light display-6">Pobyty na oddzialach ({selectedPatient.w_num.count})</h1>
                    )}
                    {selectedPatient.wards && (
                        <>
                            <table className="table mt-3 mb-4">
                            <thead>
                                <tr className="bg-danger text-white">
                                    <th className="text-center" scope="col">Oddzial</th>
                                    <th className="text-center" scope="col">Poczatkowy termin</th>
                                    <th className="text-center" scope="col">Koncowy termin</th>
                                </tr>
                            </thead>
                            {selectedPatient.wards && selectedPatient.wards.map((war) => {
                                return(
                                        <tbody>
                                            <tr className="table-dark" key={war.nazwa}>
                                                <td className="text-center">{war.nazwa}</td>
                                                <td className="text-center">{war.poczatek.substring(0,10)}</td>
                                                <td className="text-center">{war.koniec.substring(0,10)}</td>
                                            </tr>
                                        </tbody>
                                );
                            })}
                            </table>
                        </>
                    )}

                    {selectedPatient.o_num && (
                        <h1 className="text-center mt-5 font-weight-light display-6">Operacje pacjenta ({selectedPatient.o_num.count})</h1>
                    )}

                    {selectedPatient.operations && (
                        <>
                            <table className="table mt-3 mb-4">
                            <thead>
                                <tr className="table-dark text-white">
                                    <th className="text-center" scope="col">Operacja</th>
                                    <th className="text-center" scope="col">Sala operacyjna</th>
                                    <th className="text-center" scope="col">Termin</th>
                                    <th className="text-center" scope="col">Lekarz</th>
                                </tr>
                            </thead>
                            {selectedPatient.operations && selectedPatient.operations.map((op) => {
                                return(
                                        <tbody>
                                            <tr className="bg-primary text-white" key={op.id_operacja_pacjent}>
                                                <td className="text-center">{op.nazwa}</td>
                                                <td className="text-center">{op.sala_operacyjna}</td>
                                                <td className="text-center">lek. {op.imie} {op.nazwisko}</td>
                                                <td className="text-center">{op.termin.substring(0,10)}</td>
                                            </tr>
                                        </tbody>
                                );
                            })}
                            </table>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default PatientDetailPage
