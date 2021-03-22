import React, { useEffect, useState } from 'react'
import moment from 'react-moment';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const AddAppointment = () => {
    const [licence, setLicence] = useState("");
    const [password, setPassword] = useState("");
    const [clinic, setClinic] = useState("Poradnia");
    const [date, setDate] = useState("");
    const [start, setStart] = useState("Godzina rozpoczecia");
    const [end, setEnd] = useState("Godzina zakonczenia");

    const [clinics,setClinics] = useState([]);

    let history = useHistory();
    const location = useLocation();

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/clinics/");
                setClinics(response.data.data.clinic);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(licence.toString().length===0 || password.toString().length===0){
                console.log(date);
                console.log(start);
                console.log(end);
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post("/appointment/",{
                    nr_licencji: licence,
                    haslo: password,
                    poczatek: start,
                    koniec: end,
                    poradnia: clinic,
                    data: date,
                });
                if(response.status === 201){
                    alert("utworzono wizyte");
                    history.push("/");
                    history.push(location.pathname)
                }
            }
        }catch(err){
            alert(err.response.data.data.err);
        }
    }

    return (
        <div className="mb-5">
            <form action="">
                <div className="row">
                    <div className="col">
                        <input value={licence} onChange={(e) => setLicence(e.target.value)} type="text" className="form-control" placeholder="numer licencji"/>
                    </div>
                    <div className="col">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="haslo"/>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <select value={start} onChange={(e) => setStart(e.target.value)} id="start" className="form-select custom-select custom-select-lg">
                            <option disabled>Godzina rozpoczecia</option>
                            <option value="8:00">8:00</option>
                            <option value="9:00">9:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                        </select>
                    </div>

                    <div className="col">
                        <select value={end} onChange={(e) => setEnd(e.target.value)} id="end" className="form-select custom-select custom-select-lg">
                            <option disabled>Godzina zakonczenia</option>
                            <option value="9:00">9:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <input onChange={(e) => setDate(e.target.value)} type="date" className="form-control" placeholder="data"  min="2021-01-26" max="2021-05-31"/>
                    </div>
                    <div className="col">
                        <select value={clinic} onChange={(e) => setClinic(e.target.value)} id="clinic" className="form-select custom-select custom-select-lg">
                            <option disabled>Poradnia</option>
                            {clinics && clinics.map(clc => {
                                return (
                                    <option key={clc.id_poradnia} value={clc.nazwa}>{clc.nazwa}</option>
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

export default AddAppointment
