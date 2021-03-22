import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Hospital from '../apis/Hospital';
import AddDisease from '../components/AddDisease';
import DiseasesList from '../components/DiseasesList'
import NavBar from '../components/NavBar'
import { HospitalContext } from '../context/HospitalContext';

const Diseases = () => {
    const {diseases, setDiseases} = useContext(HospitalContext);

    let history = useHistory();
    
    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/diseases/");
                setDiseases(response.data.data);
                //console.log(diseases.disease);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);


    return (
        <div>
            <NavBar/>
            <h1 className="text-center display-2 font-weight-light mb-5">Popularne Choroby</h1>
            <AddDisease/>
            {diseases && (
                <DiseasesList dis={diseases.disease}/>
            )}
        </div>
    )
}

export default Diseases
