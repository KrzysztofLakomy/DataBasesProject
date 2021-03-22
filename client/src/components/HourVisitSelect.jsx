import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const HourVisitSelect = ({id_doctor,id_clinic}) => {

    const [hours,setHours] = useState([]);
    const [hour,setHour] = useState("");
    const [name, setName] = useState("");
    const [pesel,setPesel] = useState("");

    let history = useHistory();

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                console.log(id_clinic);
                console.log(id_doctor);
                const response = await Hospital.get(`/doctors/${id_doctor}/clinics/${id_clinic}/visit`);
                setHours(response.data.data.dates);

            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(name.toString().length===0 || pesel.toString().length===0 || hour.toString().length===0 ){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post(`/doctors/${id_doctor}/clinics/${id_clinic}/visit/update/${hour}`,{
                    imie: name,
                    pesel: pesel,
                });
                if(response.status === 201){
                    alert("zapisano na wizyte");
                    history.push("/");
                }
            }

        }catch(err){
            alert(err.response.data.data.err);
        }
    }

    return (
        <div>
            <select value={hour} onChange={(e) => setHour(e.target.value)} id="hour" className="form-select custom-select custom-select-lg">
                <option value="" disabled hidden defaultValue>Wybor daty</option>
                {hours && hours.map(hr => {
                    return (
                        <option key={hr.id_wizyta_na_godzine} value={hr.id_wizyta_na_godzine}>{hr.termin.substring(0,10)} -- {hr.godzina}</option>
                    );
                })}
            </select>
            <div className="row mt-3">
                <div className="col-6">
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="imie pacjenta"/>
                </div>
                <div className="col-6">
                    <input onChange={(e) => setPesel(e.target.value)} type="text" className="form-control" placeholder="pesel"/>
                </div>
            </div>
            <div className="row mt-3">
                <button type="submit" onClick={handleSubmit} className="btn btn-warning text-light">Zapisz sie</button>
            </div>
        </div>
    )
}

export default HourVisitSelect
