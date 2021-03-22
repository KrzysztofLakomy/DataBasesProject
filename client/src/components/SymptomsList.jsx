import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const SymptomsList = ({id}) => {

    const [symptoms, setSymptoms] = useState([]);


    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get(`/diseases/${id}`);
                setSymptoms(response.data.data.symptoms);
                //console.log(symptoms);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    return (
        <div className="card-text">
            <h6>Objawy:</h6>
            {symptoms && symptoms.map((symptom) => {
                return(
                    <li key={symptom.nazwa}>{symptom.nazwa} (zagrozenie - {symptom.stopien_zagrozenia})</li>
                );
            })}
        </div>
    )
}

export default SymptomsList
