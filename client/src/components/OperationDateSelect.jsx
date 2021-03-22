import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const OperationDateSelect = ({id_operation}) => {
    const [dates,setDates] = useState([]);
    const [date,setDate] = useState("");
    const [name, setName] = useState("");
    const [pesel, setPesel] = useState("");

    let history = useHistory();

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get(`/operations/${id_operation}`);
                setDates(response.data.data.dates);

            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(name.toString().length===0 || pesel.toString().length===0 || date.toString().length===0 ){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post(`/operations/${id_operation}/update/${date}`,{
                    imie: name,
                    pesel: pesel,
                });
                if(response.status === 201){
                    alert("zapisano na operacje");
                    history.push("/operation");
                }
            }

        }catch(err){
            alert(err.response.data.data.err);
        }
    }


    return (
        <div>
            <select value={date} onChange={(e) => setDate(e.target.value)} id="hour" className="form-select custom-select custom-select-lg">
                <option value="" disabled hidden defaultValue>Wybor daty</option>
                {dates && dates.map(dt => {
                    return (
                        <option key={dt.id_operacja_pacjent} value={dt.id_operacja_pacjent}>{dt.termin.substring(0,10)}</option>
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
                <button type="submit" onClick={handleSubmit} className="btn btn-warning text-light">Zapisz</button>
            </div>
        </div>
    )
}

export default OperationDateSelect
