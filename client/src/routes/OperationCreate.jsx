import React from 'react'
import AddOperation from '../components/AddOperation'
import NavBar from '../components/NavBar'

const OperationCreate = () => {
    return (
        <div>
            <NavBar/>
            <h1 className="text-center display-3 font-weight-light mb-5">Tworzenie Operacji</h1>
            <h3 className="text-center font-weight-light mb-2">Tylko dla lekarzy</h3>
            <AddOperation/>
        </div>
    )
}

export default OperationCreate
