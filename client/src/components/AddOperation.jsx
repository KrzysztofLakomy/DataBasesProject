import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const AddOperation = () => {
    const [operation,setOperation] = useState("");
    const [licence,setLicence] = useState("");
    const [password,setPassword] = useState("");
    const [date,setDate] = useState("");
    const [operations,setOperations] = useState([]);

    let history = useHistory();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(licence.toString().length===0 || password.toString().length===0 || date.toString().length===0 || operation.toString().length===0){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post("/operation/",{
                    nr_licencji: licence,
                    haslo: password,
                    operacja: operation,
                    data: date,
                });
                if(response.status === 201){
                    alert("utworzono operacje w terminie");
                    history.push("/");
                    history.push("/operation");
                }
            }
        }catch(err){
            alert(err.response.data.data.err);
        }
    }

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/operations/");
                setOperations(response.data.data.operations);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    return (
        <div>
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
                        <input onChange={(e) => setDate(e.target.value)} type="date" className="form-control" placeholder="data"  min="2021-01-26" max="2021-05-31"/>
                    </div>
                    <div className="col">
                        <select value={operation} onChange={(e) => setOperation(e.target.value)} id="ward" className="form-select custom-select custom-select-lg">
                            <option value="" disabled hidden defaultValue>Operacja</option>
                            {operations && operations.map(op => {
                                return (
                                    <option key={op.id_operacja} value={op.id_operacja}>{op.nazwa} (lek. {op.imie} {op.nazwisko})</option>
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

export default AddOperation
