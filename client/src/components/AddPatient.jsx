import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const AddPatient = () => {
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [password,setPassword] = useState("");
    const [pesel,setPesel] = useState("");

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(name.toString().length===0 || surname.toString().length===0 || password.toString().length===0 || pesel.toString().length===0){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post("/patients/",{
                    imie: name,
                    nazwisko: surname,
                    haslo: password,
                    pesel: pesel,
                });
                if(response.status === 201){
                    alert("dodano pacjenta");
                    history.push("/patients");
                }
            }
        }catch(err){
            alert(err.response.data.data.err);
        }
    }

    return (
        <div className="mb-4">
            <form action="">
                <div className="row">
                    <div className="col">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="imie"/>
                    </div>
                    <div className="col">
                        <input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" className="form-control" placeholder="nazwisko"/>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <input value={pesel} onChange={(e) => setPesel(e.target.value)} type="text" className="form-control" placeholder="PESEL"/>
                    </div>
                    <div className="col">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="haslo"/>
                    </div>
                    <div className="col-1">
                        <button onClick={handleSubmit} className="btn btn-primary" type="submit">Rejestruj</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddPatient
