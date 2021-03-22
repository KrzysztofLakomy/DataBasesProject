import React from 'react'
import NavBar from '../components/NavBar'
import PatientsList from '../components/PatientsList'

const Patients = () => {
    return (
        <div>
            <NavBar/>
            <div className="text-center font-weight-light display-2 mb-5">Pacjenci w systemie</div>
            <PatientsList/>
        </div>
    )
}

export default Patients
