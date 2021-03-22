import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Hospital from '../apis/Hospital';
import SymptomsList from './SymptomsList'

const DiseasesList = ({dis}) => {
    const [isVisible,setIsVisible] = useState(false);

    const handleVisibility = () =>{
        isVisible? setIsVisible(false):setIsVisible(true);
    }

    const [name, setName] = useState("");
    const [threat, setThreat] = useState("");
    

    let history = useHistory();
    
    const handleSubmit = async (e,id) => {
        e.preventDefault();
        try{
            if(name.toString().length===0 || threat.toString().length ===0){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post("/diseases/symptoms/",{
                    nazwa: name,
                    zagrozenie: threat,
                    id_choroba: id,
                });
                if(response.status === 201){
                    alert("dodano symptom");
                    history.push("/");
                    history.push("/diseases");
                }
            }
        }catch(err){
            alert(err.response.data.data.err);
        }
    }

    return (
        <div className="mb-4">
                {dis && dis.map((disease) => {
                    return(
                        <div className="row hov mx-5 d-flex justify-content-center">
                            <div className="card hover-shadow text-white bg-danger mb-3 mr-4 col-7" onClick={handleVisibility} style={{maxWidth: "40%"}} key={disease.id_choroba}>
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{disease.nazwa}</h5>
                                </div>
                                <div className="card-body"> 
                                    <SymptomsList id={disease.id_choroba}/>
                                </div>
                            </div>
                            {isVisible && (
                                <div className="col-5">
                                <form action="">
                                    <div className="row mt-2">
                                        <div className="col">
                                            <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="symptom"/>
                                        </div>
                                        <div className="col">
                                        <select value={threat} onChange={(e) => setThreat(e.target.value)} id="ward" className="form-select custom-select custom-select-lg">
                                            <option value="" disabled hidden defaultValue>zagrozenie</option>
                                            <option value="male">male</option>
                                            <option value="duze">duze</option>
                                            <option value="srednie">srednie</option>
                                        </select>
                                        </div>
                                        <div className="col-1">
                                            <span onClick={(e)=>handleSubmit(e,disease.id_choroba)} className="btn btn-primary" >Dodaj symptom</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            )}

                        </div>
                    );
                })}
        </div>
    )
}

export default DiseasesList
