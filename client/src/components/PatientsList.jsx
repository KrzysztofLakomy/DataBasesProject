import React, { useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';
import { HospitalContext } from '../context/HospitalContext';

const PatientsList = () => {
    const {patients, setPatients} = useContext(HospitalContext);

    let history = useHistory();
    const location = useLocation();
    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/patients/");
                setPatients(response.data.data.patient);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const handleDetails = (id) => {
        history.push(`/patients/${id}`);
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
            const response = await Hospital.delete(`/patients/${id}`);
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
                        <th className="text-center" scope="col">Pacjent</th>
                        <th className="text-center" scope="col">PESEL</th>
                        <th className="text-center" scope="col">Usuwanie</th>
                    </tr>
                </thead>
                <tbody>
                    {patients && patients.map(patient => {
                        return(
                            <tr onClick={() => handleDetails(patient.id_pacjent)} key={patient.id_pacjent}>
                                <td className="text-center">{patient.imie} {patient.nazwisko}</td>
                                <td className="text-center">{patient.pesel}</td>
                                <td className="text-center"><button onClick={(e)=>handleDelete(e,patient.id_pacjent)} type="submit" className="btn btn-danger">Usun</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PatientsList
