import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';
import ClinicVisitsList from './ClinicVisitsList';
import VisitsModal from './VisitsModal';


const ClinicsList = () => {

    const [clinics,setClinics] = useState([]);

    let history = useHistory();
    const location = useLocation();

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/clinics/");
                setClinics(response.data.data.clinic);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
            const response = await Hospital.delete(`/clinics/${id}`);
            history.push(`/`);
            history.push(location.pathname);

        }catch(err){
            alert(err);
        }
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr className="table-dark">
                        <th className="text-center" scope="col">Poradnia</th>
                        <th className="text-center" scope="col">Rodzaj</th>
                        <th className="text-center" scope="col">Umow sie na wizyte</th>
                        <th className="text-center" scope="col">Usuwanie</th>
                    </tr>
                </thead>
                <tbody>
                    {clinics && clinics.map(clinic => {
                        return (
                            <tr key={clinic.id_poradnia}>
                                <td className="text-center">{clinic.nazwa}</td>
                                <td className="text-center">{clinic.rodzaj}</td>
                                <VisitsModal id={clinic.id_poradnia} name={clinic.nazwa}/>
                                <td className="text-center"><button onClick={(e)=>handleDelete(e,clinic.id_poradnia)} type="submit" className="btn btn-danger">Usun</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ClinicsList
