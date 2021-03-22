import React from 'react'
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const AddClinic = () => {
    const [name,setName] = useState("");
    const [type,setType] = useState("");

    const location = useLocation();
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(name.toString().length===0 || type.toString().length===0){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post("/clinics/",{
                    nazwa: name,
                    rodzaj: type,
                });
                if(response.status === 201){
                    alert("dodano poradnie");
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
                        <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="nazwa poradni"/>
                    </div>
                    <div className="col">
                        <select value={type} onChange={(e) => setType(e.target.value)} id="type" className="form-select custom-select custom-select-lg">
                        <option value="" disabled hidden defaultValue>Rodzaj</option>
                            <option value="zwykla">zwykla</option>
                            <option value="zabiegowa">zabiegowa</option>
                        </select>
                    </div>
                    
                    <div className="col-1">
                        <button onClick={handleSubmit} className="btn btn-primary" type="submit">Dodaj</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddClinic
