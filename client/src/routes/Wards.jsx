import React from 'react'
import { useHistory } from 'react-router-dom'
import AddWard from '../components/AddWard'
import NavBar from '../components/NavBar'
import WardsList from '../components/WardsList'

const Wards = () => {
    let history = useHistory();

    const handleSubmit = (e) => {
        e.stopPropagation();
        history.push("/w/patient");
    }

    return (
        <div>
            <NavBar/>
            <h1 className="text-center font-weight-light display-2 mb-4">Szpitalne oddzialy</h1>
            <form action="" className="mb-5">
                <div className="row">
                    <button onClick={(e) => handleSubmit(e)} className="btn btn-danger" type="button">Dodaj pacjenta na oddzial</button>
                </div>
            </form>
            <WardsList/>
            <AddWard/>
        </div>
    )
}

export default Wards
