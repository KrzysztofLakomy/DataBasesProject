import React from 'react'
import NavBar from '../components/NavBar'
import SelectDoctor from '../components/SelectDoctor'


const AppointmentSignUp = () => {
    return (
        <div>
            <NavBar/>
            <h1 className="text-center font-weight-light display-4 mb-4">Zapisz sie na wizyte</h1>
            <SelectDoctor/>
        </div>
    )
}

export default AppointmentSignUp
