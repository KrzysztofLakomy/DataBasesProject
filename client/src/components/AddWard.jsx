import React from 'react'
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const AddWard = () => {

    const [name,setName] = useState("");
    const [head,setHead] = useState("");

    const location = useLocation();
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(name.toString().length===0 || head.toString().length===0){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post("/wards/",{
                    nazwa: name,
                    ordynator: head,
                });
                if(response.status === 201){
                    alert("dodano oddzial");
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
                    <h1 className="text-center font-weight-light display-6">Dodawanie oddzialow</h1>
                </div>
                <div className="row">
                    <div className="col">
                        <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="nazwa oddzialu"/>
                    </div>
                    <div className="col">
                        <input onChange={(e) => setHead(e.target.value)} type="text" className="form-control" placeholder="ordynator"/>
                    </div>

                    <div className="col-1">
                        <button onClick={handleSubmit} className="btn btn-primary" type="submit">Dodaj</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddWard
