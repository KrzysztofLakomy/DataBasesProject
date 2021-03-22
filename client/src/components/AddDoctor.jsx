import React, { useContext, useState } from 'react'
import Hospital from '../apis/Hospital';
import { HospitalContext } from '../context/HospitalContext';

const AddDoctor = () => {

    const {addDoctors} = useContext(HospitalContext);
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [password,setPassword] = useState("");
    const [specialization,setSpecialization] = useState("");
    const [licence,setLicence] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(name.toString().length===0 || surname.toString().length===0 || password.toString().length===0 || specialization.toString().length===0 || licence.toString().length===0){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post("/doctors/",{
                    imie: name,
                    nazwisko: surname,
                    haslo: password,
                    specjalizacja: specialization,
                    nr_licencji: licence,
                });
                if(response.status === 201){
                    alert("dodano doktora");
                    addDoctors(response.data.data.doctor);
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
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="imie"/>
                    </div>
                    <div className="col">
                        <input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" className="form-control" placeholder="nazwisko"/>
                    </div>
                    <div className="col">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="haslo"/>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <input value={licence} onChange={(e) => setLicence(e.target.value)} type="text" className="form-control" placeholder="numer licencji"/>
                    </div>
                    <div className="col">
                        <input value={specialization} onChange={(e) => setSpecialization(e.target.value)} type="text" className="form-control" placeholder="specjalizacja"/>
                    </div>
                    <div className="col-1">
                        <button onClick={handleSubmit} className="btn btn-primary" type="submit">Dodaj</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor
