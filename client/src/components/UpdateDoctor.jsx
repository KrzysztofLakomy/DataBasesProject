import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const UpdateDoctor = () => {
    const {id} = useParams();
    let history = useHistory();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [licence, setLicence] = useState("");

    useEffect( () => {
        const fetchData = async () =>{
            try{
                const response = await Hospital.get(`/doctors/${id}`);
                setName(response.data.data.doctor.imie);
                setSurname(response.data.data.doctor.nazwisko);
                setPassword(response.data.data.doctor.haslo);
                setSpecialization(response.data.data.doctor.specjalizacja);
                setLicence(response.data.data.doctor.nr_licencji);
            }catch(err){
                alert(err);
            }
        }
        fetchData();
    },[]);

    const handleUpdate = async (e) =>{
        e.preventDefault();
        try{
            const response = await Hospital.put(`/doctors/${id}`,{
                imie: name,
                nazwisko: surname,
                haslo: password,
                nr_licencji: licence,
                specjalizacja: specialization,
            });
            history.push("/doctors");
        }catch(err){
            alert(err);
        }
    }


    return (
        <div className="mb-5">
            <form action="">
                <div className="from-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => {setName(e.target.value)}} type="text" className="form-control" id="name"/>
                </div>
                <div className="from-group">
                    <label htmlFor="surname">Surname</label>
                    <input value={surname} onChange={(e) => {setSurname(e.target.value)}}  type="text" className="form-control" id="surname"/>
                </div>
                <div className="from-group">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => {setPassword(e.target.value)}}  type="password" className="form-control" id="password"/>
                </div>
                <div className="from-group">
                    <label htmlFor="licence">Licence</label>
                    <input value={licence} onChange={(e) => {setLicence(e.target.value)}}  type="text" className="form-control" id="licence"/>
                </div>
                <div className="from-group">
                    <label htmlFor="spec">Specialization</label>
                    <input value={specialization} onChange={(e) => {setSpecialization(e.target.value)}}  type="text" className="form-control" id="spec"/>
                </div>
                <button onClick={handleUpdate} className="btn btn-secondary" type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateDoctor
