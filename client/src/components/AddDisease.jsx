import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const AddDisease = () => {
    const [name,setName] = useState("");

    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(name.toString().length===0){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post("/diseases/",{
                    nazwa: name,
                });
                if(response.status === 201){
                    alert("dodano chorobe");
                    history.push("/");
                    history.push("/diseases");
                }
            }

        }catch(err){
            alert(err.response.data.data.err);
        }
    }

    return (
        <div className="mb-5">
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
    )
}

export default AddDisease
