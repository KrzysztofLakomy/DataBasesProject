import React from 'react'
import AddAppointment from '../components/AddAppointment'
import NavBar from '../components/NavBar'

const AppointmentCreate = () => {
    return (
        <div>
            <NavBar/>
            <h1 className="text-center display-3 font-weight-light mb-5">Tworzenie Wizyt</h1>
            <h3 className="text-center font-weight-light mb-2">Tylko dla lekarzy</h3>
            <AddAppointment/>
        </div>
    )
}

export default AppointmentCreate
