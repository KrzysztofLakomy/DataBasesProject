import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar';
import UpdateDoctor from '../components/UpdateDoctor';

const UpdateDoctorRoute = () => {
    const {id} = useParams();


    return (
        <div>
            <NavBar/>
            <h1 className="text-center font-weight-light display-2">Update Doctor</h1>
            <UpdateDoctor/>
        </div>
    )
}

export default UpdateDoctorRoute
