import React from 'react'
import NavBar from '../components/NavBar'
import SelectOperation from '../components/SelectOperation'

const OperationSignUp = () => {
    return (
        <div>
            <NavBar/>
            <h1 className="text-center font-weight-light display-2 mb-5">Zapisz pacjenta na operacje</h1>
            <SelectOperation/>
        </div>
    )
}

export default OperationSignUp
