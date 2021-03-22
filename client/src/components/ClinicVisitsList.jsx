import React, { useEffect } from 'react'
import { useState } from 'react';
import Hospital from '../apis/Hospital';

const ClinicVisitsList = ({id}) => {
    const [visits,setVisits] = useState([]);

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get(`/clinics/${id}`);
                setVisits(response.data.data);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);


    return (
        <div>
            {visits.visits && (
                <>
                    <h1 className="text-center display-6 font-weight-light mt-5 mb-4">Liczba otwartych wizyt ({visits.number.count})</h1>
                    {visits.visits && visits.visits.map((visit) => {
                        return(
                            <div className="row mx-5 d-flex justify-content-center">
                                <div className="card hover text-white bg-danger mb-3 mr-4 col-7" style={{maxWidth: "40%"}} key={visit.termin}>
                                    <div className="card-header d-flex justify-content-between">
                                        <h5 className="font-weight-light">lek. {visit.imie} {visit.nazwisko}</h5>
                                    </div>
                                    <div className="card-body"> 
                                        <p className="text-center">Data: {visit.termin.substring(0,10)}</p>
                                        <p className="text-center">Poczatek: {visit.poczatek}</p>
                                        <p className="text-center">Koniec: {visit.koniec}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    )
}

export default ClinicVisitsList
