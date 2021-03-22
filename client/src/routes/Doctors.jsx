import React from 'react'
import AddDoctor from '../components/AddDoctor'
import DoctorsList from '../components/DoctorsList'
import NavBar from '../components/NavBar'

const Doctors = () => {
    return (
        <div>
            <NavBar/>
            <div className="text-center font-weight-light display-2 mb-4">Nasi Lekarze</div>
            <AddDoctor/>
            <DoctorsList/>
        </div>
    )
}

export default Doctors
