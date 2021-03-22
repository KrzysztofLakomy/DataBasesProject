import React from 'react'
import AddClinic from '../components/AddClinic'
import ClinicsList from '../components/ClinicsList'
import NavBar from '../components/NavBar'

const Clinics = () => {
    return (
        <div>
            <NavBar/>
            <h1 className="text-center display-2 font-weight-light mb-5">Lista Poradni</h1>
            <AddClinic/>
            <ClinicsList/>
        </div>
    )
}

export default Clinics
