import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';
import { HospitalContext } from '../context/HospitalContext'
import ClinicSelect from './ClinicSelect';

const SelectDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [doctor, setDoctor] = useState("");

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

    const handleReset = () => {
        history.push("/");
        history.push(location.pathname);
    }

    return (
        <div className="mb-2">
            <form action="">
                <div className="row d-flex justify-content-center">
                    <button type="submit" onClick={handleReset} className="btn btn-primary">Reset</button>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        {!doctor && (
                            <>
                            <label htmlFor="doc">Wybor lekarza</label>
                            <select value={doctor} onChange={(e) => setDoctor(e.target.value)}id="doc" className="form-select custom-select custom-select-lg">
                                <option value="" disabled hidden defaultValue>Wybor doktora</option>
                                {doctors && doctors.map(doc => {
                                    return (
                                        <option key={doc.id_lekarz} value={doc.id_lekarz}>{doc.imie} {doc.nazwisko}</option>
                                    );
                                })}
                            </select>
                            </>
                        )}
                    </div>
                </div>
                {doctor &&
                    <div className="row d-flex justify-content-center">
                        <div className="col-6">
                            <ClinicSelect id_doctor={parseInt(doctor)}/>
                        </div>
                    </div>
                }
            </form>
        </div>
    )
}

export default SelectDoctor
