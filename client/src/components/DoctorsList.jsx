import React, { useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital'
import { HospitalContext } from '../context/HospitalContext';
import StarRating from './StarRating';

const DoctorsList = () => {
    const {doctors, setDoctors} = useContext(HospitalContext);

    let history = useHistory();
    const location = useLocation();

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/doctors/");
                setDoctors(response.data.data.doctor);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/doctors/${id}/update`)
    }

    const renderRating = (doctor) => {
        if(doctor.liczba_opinii === 0){
            return(
                <span className="text-warning">0 reviews</span>
            );
        }

        return(
            <>
                <StarRating rating={doctor.srednia}/>
                <span className="text-warning ml-1">({doctor.liczba_opinii})</span>
            </>
        );
    }

    const handleDoctorSelect = (id) => {
        history.push(`/doctors/${id}`);
    }

    const handleSignUp = (e) => {
        e.stopPropagation();
        history.push("/appointment/signUp");
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
            const response = await Hospital.delete(`/doctors/${id}`);
            history.push(`/`);
            history.push(location.pathname);

        }catch(err){
            alert(err);
        }
    }

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr className="table-dark">
                        <th className="text-center" scope="col">Lekarz</th>
                        <th className="text-center" scope="col">Specjalizacja</th>
                        <th className="text-center" scope="col">Ocena</th>
                        <th className="text-center" scope="col">Zapisz sie na wizyte</th>
                        <th className="text-center" scope="col">Edycja</th>
                        <th className="text-center" scope="col">Usuwanie</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors && doctors.map(doctor => {
                        return (
                            <tr onClick={()=>handleDoctorSelect(doctor.id_lekarz)} key={doctor.id_lekarz}>
                                <td className="text-center">{doctor.imie} {doctor.nazwisko}</td>
                                <td className="text-center">{doctor.specjalizacja}</td>
                                <td className="text-center">{renderRating(doctor)}</td>
                                <td className="text-center"><button type="submit" onClick={(e)=>handleSignUp(e)} className="btn btn-primary">Wizyta</button></td>
                                <td className="text-center"><button onClick={(e) => handleUpdate(e,doctor.id_lekarz)} type="submit" className="btn btn-secondary">Edytuj</button></td>
                                <td className="text-center"><button onClick={(e)=>handleDelete(e,doctor.id_lekarz)} type="submit" className="btn btn-danger">Usun</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DoctorsList
