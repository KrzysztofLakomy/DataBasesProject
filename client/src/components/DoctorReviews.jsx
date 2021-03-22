import React from 'react'
import StarRating from './StarRating';

const DoctorReviews = ({reviews}) => {
    return (
        <div className="mb-2 row">
            {reviews && reviews.map((review) => {
                return(
                    <div className="card text-white bg-primary mb-3 mr-4 col-4" style={{maxWidth: "30%"}} key={review.id_opinia_o_lekarzu}>
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.imie}</span>
                            <span><StarRating rating={review.ocena}/></span>
                        </div>
                        <div className="card-body"> 
                            <p className="card-text">{review.opinia}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default DoctorReviews
