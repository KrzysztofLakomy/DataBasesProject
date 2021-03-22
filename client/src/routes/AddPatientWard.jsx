import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';
import NavBar from '../components/NavBar';

const AddPatientWard = () => {

    const [patients,setPatients] = useState([]);
    const [wards,setWards] = useState([]);

    const [patient,setPatient] = useState("");
    const [ward,setWard] = useState("");
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");

    let history = useHistory();
    const location = useLocation();


    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/patients/");
                setPatients(response.data.data.patient);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/wards/");
                setWards(response.data.data.wards);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(patient.toString().length===0 || ward.toString().length===0 || start.toString().length===0 || end.toString().length===0){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post("/wards/patient/",{
                    id_pacjent: patient,
                    id_oddzial: ward,
                    poczatek: start,
                    koniec: end,
                });
                if(response.status === 201){
                    alert("dodano pacjenta do oddzialu");
                    history.push("/wards");
                }
            }
        }catch(err){
            alert(err.response.data.data.err);
        }
    }

    return (
        <div>
            <NavBar/>
            <h1 className="text-center font-weight-light display-2">Zapisz pacjenta na oddzial</h1>
            <form action="">
                <div className="row">
                    <div className="col">
                        <label htmlFor="start">Poczatek</label>
                        <input onChange={(e) => setStart(e.target.value)} id="start" type="date" className="form-control" placeholder="poczatek"  min="2021-01-26" max="2021-05-31"/>
                    </div>
                    <div className="col">
                        <label htmlFor="end">Koniec</label>
                        <input onChange={(e) => setEnd(e.target.value)} id="end" type="date" className="form-control" placeholder="koniec"  min="2021-01-27" max="2021-05-31"/>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <select value={ward} onChange={(e) => setWard(e.target.value)} id="ward" className="form-select custom-select custom-select-lg">
                            <option value="" disabled hidden defaultValue>Oddzial</option>
                            {wards && wards.map(war => {
                                return (
                                    <option key={war.id_oddzial} value={war.id_oddzial}>{war.nazwa}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="col">
                        <select value={patient} onChange={(e) => setPatient(e.target.value)} id="patient" className="form-select custom-select custom-select-lg">
                            <option value="" disabled hidden defaultValue>Pacjent</option>
                            {patients && patients.map(pat => {
                                return (
                                    <option key={pat.id_pacjent} value={pat.id_pacjent}>{pat.imie} {pat.nazwisko} ({pat.pesel})</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-1">
                        <span onClick={handleSubmit} className="btn btn-primary">Dodaj</span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddPatientWard
