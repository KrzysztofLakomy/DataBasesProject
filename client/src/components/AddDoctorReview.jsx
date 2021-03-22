import React, { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Hospital from '../apis/Hospital';

const AddDoctorReview = () => {
    const {id} = useParams();
    const location = useLocation();
    let history = useHistory();

    const [pesel,setPesel] = useState("");
    const [password,setPassword] = useState("");
    const [review,setReview] = useState("");
    const [rating,setRating] = useState("Ocena");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try{
            if(pesel.toString().length===0 || password.toString().length===0 || review.toString().length===0 || rating.toString()==="Rating"){
                alert("Wszystkie pola musza być uzuplelnione");
            }
            else{
                const response = await Hospital.post(`/doctors/${id}/addReview`,{
                    pesel: pesel,
                    haslo: password,
                    ocena: rating,
                    opinia: review,
                });
                if(response.status === 201){
                    alert("dodano opinie o lekarzu");
                    history.push("/doctors/");
                    history.push(location.pathname);
                }
            }

        }catch(err){
           alert(err.response.data.data.err)
        }
    }

    return (
        <div className="mb-2">
            <form action="">
                <div className="row">
                    <div className="form-group col-4">
                        <input value={pesel} onChange={(e) => setPesel(e.target.value)} type="text" id="pesel" className="form-control" placeholder="PESEL"/>
                    </div>
                    <div className="form-group col-4">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="form-control" placeholder="haslo"/>
                    </div>
                    <div className="col-4">
                        <select value={rating} onChange={(e) => setRating(e.target.value)} id="rating" className="form-select custom-select custom-select-lg">
                            <option disabled>Ocena</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group mt-4">
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} id="review" className="form-control" placeholder="opinia"></textarea>
                </div>
                <button onClick={(e) => handleSubmitReview(e)} className="btn btn-primary" type="submit">Wyslij</button>
            </form>
        </div>
    )
}

export default AddDoctorReview
