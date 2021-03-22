import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Hospital from '../apis/Hospital';
import NavBar from '../components/NavBar';
import OperationsModal from '../components/OperationsModal';
import WardDoctorModal from '../components/WardDoctorModal';
import { HospitalContext } from '../context/HospitalContext';

const WardDetailPage = () => {
    const {id} = useParams();

    const {selectedWard, setSelectedWard} = useContext(HospitalContext);

    let history = useHistory();
    const location = useLocation();

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get(`/wards/${id}`);
                setSelectedWard(response.data.data);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    return (
        <div>
            <NavBar/>
            {selectedWard && (
                <>
                    {selectedWard.ward && (
                        <>
                            <h1 className="display-4 text-center font-weight-light mb-5">Oddzial: {selectedWard.ward.nazwa}</h1>
                            <table className="table mb-4">
                                <thead>
                                    <tr className="table-dark">
                                        <th className="text-center" scope="col">Nazwa</th>
                                        <th className="text-center" scope="col">Ordynator</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={selectedWard.ward.id_oddzial}>
                                        <td className="text-center">{selectedWard.ward.nazwa}</td>
                                        <td className="text-center">{selectedWard.ward.ordynator}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                    
                    <h1 className="display-6 text-center font-weight-light mt-5">Przeprowadzane operacje</h1>
                    <div className="mb-4 d-flex justify-content-center">
                        <form action="">
                            <div className="row mt-2">
                                <div className="col">
                                    <OperationsModal id={id} doctors={selectedWard.doctors}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="mb-5">
                    {selectedWard.operations && (
                        <>
                            <table className="table mb-4">
                            <thead>
                                <tr className="table-dark text-white">
                                    <th className="text-center" scope="col">Lekarz</th>
                                    <th className="text-center" scope="col">Operacja</th>
                                    <th className="text-center" scope="col">Sala operacyjna</th>
                                </tr>
                            </thead>
                            {selectedWard.operations && selectedWard.operations.map((op) => {
                                return(
                                    <tbody>
                                        <tr className="bg-primary text-white" key={op.id_operacja}>
                                            <td className="text-center">lek. {op.imie} {op.nazwisko}</td>
                                            <td className="text-center">{op.nazwa}</td>
                                            <td className="text-center">{op.sala_operacyjna}</td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                            </table>
                        </>
                    )}
                    </div>


                    {selectedWard.doctor_num && (
                        <>
                            <h1 className="display-6 text-center font-weight-light mt-5">Doktorzy na oddziale ({selectedWard.doctor_num.count})</h1>
                            <div className="mb-4 d-flex justify-content-center">
                                <form action="">
                                    <div className="row mt-2">
                                        <div className="col">
                                            <WardDoctorModal id={id}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                    <div className="mb-5">
                    {selectedWard.doctors && (
                        <>
                            <table className="table mb-4">
                            <thead>
                                <tr className="bg-danger text-white">
                                    <th className="text-center" scope="col">Lekarz</th>
                                    <th className="text-center" scope="col">Specjalizacja</th>
                                    <th className="text-center" scope="col">Numer licencji</th>
                                </tr>
                            </thead>
                            {selectedWard.doctors && selectedWard.doctors.map((doc) => {
                                return(
                                        <tbody>
                                            <tr className="table-dark" key={doc.id_lekarz}>
                                                <td className="text-center">lek. {doc.imie} {doc.nazwisko}</td>
                                                <td className="text-center">{doc.specjalizacja}</td>
                                                <td className="text-center">{doc.nr_licencji}</td>
                                            </tr>
                                        </tbody>
                                );
                            })}
                            </table>
                        </>
                    )}
                    </div>
                    {selectedWard.p_num && (
                        <h1 className="text-center mt-5 font-weight-light display-6">Pobyty pacjentow na oddzialach ({selectedWard.p_num.count})</h1>
                    )}
                    {selectedWard.patients && (
                        <>
                            <table className="table mt-3 mb-4">
                            <thead>
                                <tr className="table-dark text-white">
                                    <th className="text-center" scope="col">Pacjent</th>
                                    <th className="text-center" scope="col">PESEL</th>
                                    <th className="text-center" scope="col">Poczatkowy termin</th>
                                    <th className="text-center" scope="col">Koncowy termin</th>
                                </tr>
                            </thead>
                            {selectedWard.patients && selectedWard.patients.map((p) => {
                                return(
                                        <tbody>
                                            <tr className="bg-primary text-white" key={p.imie}>
                                                <td className="text-center">{p.imie} {p.nazwisko}</td>
                                                <td className="text-center">{p.pesel}</td>
                                                <td className="text-center">{p.poczatek.substring(0,10)}</td>
                                                <td className="text-center">{p.koniec.substring(0,10)}</td>
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
    )
}

export default WardDetailPage
