import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Hospital from '../apis/Hospital';
import HourVisitSelect from './HourVisitSelect';

const ClinicSelect = ({id_doctor}) => {

    const [clinics,setClinics] = useState([]);
    const [clinic,setClinic] = useState("");


    useEffect( () =>{
        const fetchData = async () =>{
            try{
                //console.log(id_doctor);
                const response = await Hospital.get(`/doctors/${id_doctor}/clinics`);
                setClinics(response.data.data.clinics);
                //console.log(clinics);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    return (
        <div className="mt-2">
            {!clinic && (
                <>
                    <label htmlFor="clc">Wybor poradni</label>
                    <select value={clinic} onChange={(e) => setClinic(e.target.value)} id="clc" className="form-select custom-select custom-select-lg">
                        <option value="" disabled hidden defaultValue>Wybor poradni</option>
                        {clinics && clinics.map(clc => {
                            return (
                                <option key={clc.id_poradnia} value={clc.id_poradnia}>{clc.nazwa} - {clc.rodzaj}</option>
                            );
                        })}
                    </select>
                </>
            )}
            {clinic &&
                    <div className="row d-flex justify-content-center">
                        <div className="col-6">
                            <HourVisitSelect id_clinic={parseInt(clinic)} id_doctor={id_doctor}/>
                        </div>
                    </div>
                }
        </div>
    );
}

export default ClinicSelect
