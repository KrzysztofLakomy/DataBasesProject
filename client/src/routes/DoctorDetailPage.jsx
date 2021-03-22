import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Hospital from '../apis/Hospital';
import AddDoctorReview from '../components/AddDoctorReview';
import DoctorReviews from '../components/DoctorReviews';
import NavBar from '../components/NavBar';
import StarRating from '../components/StarRating';
import { HospitalContext } from '../context/HospitalContext';

const DoctorDetailPage = () => {
    const {id} = useParams();
    const {selectedDoctor, setSelectedDoctor} = useContext(HospitalContext);

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get(`/doctors/${id}`);
                setSelectedDoctor(response.data.data);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const renderRating = () => {
        if(selectedDoctor.doctor.liczba_opinii === 0){
            return(
                <span className="text-warning">0 ocen</span>
            );
        }

        return(
            <>
                <StarRating rating={selectedDoctor.doctor.srednia}/>
                <span className="text-warning ml-1">({selectedDoctor.doctor.liczba_opinii})</span>
            </>
        );
    }

    return (
        <div>
            <NavBar/>
            { selectedDoctor && (
            <>
                { selectedDoctor.doctor &&
                    (<h1 className="text-center font-weight-light display-4">lek. {selectedDoctor.doctor.imie} {selectedDoctor.doctor.nazwisko}</h1>)
                }
                <div className="text-center mb-5">
                    { selectedDoctor.doctor &&(
                        renderRating()
                    )}
                </div>
                {selectedDoctor.doctor && (
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Imie</th>
                                <th scope="col">Nazwisko</th>
                                <th scope="col">Specjalizacja</th>
                                <th scope="col">Numer licencji</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={selectedDoctor.doctor.id_lekarz}>
                                <td>{selectedDoctor.doctor.imie}</td>
                                <td>{selectedDoctor.doctor.nazwisko}</td>
                                <td>{selectedDoctor.doctor.specjalizacja}</td>
                                <td>{selectedDoctor.doctor.nr_licencji}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
                <div className="mt-3 ">
                    <DoctorReviews reviews={selectedDoctor.reviews}/>
                </div>
                <AddDoctorReview/>
            </>
        )}
        </div>
    )
}

export default DoctorDetailPage
