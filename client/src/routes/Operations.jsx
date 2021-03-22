import React from 'react'
import { useHistory } from 'react-router-dom'
import NavBar from '../components/NavBar'
import OperationsList from '../components/OperationsList';

const Operations = () => {

    let history = useHistory();

    const handleSubmit1 = () => {
        history.push("/operation/create");
    }

    const handleSubmit2 = () =>{
        history.push("/operation/signUp");
    }

    return (
        <div>
            <NavBar/>
            <h1 className="text-center font-weight-light display-2 mb-5">Terminy wykonywanych operacji</h1>
            <form action="" className="mb-5 d-flex justify-content-center">
                <div className="row col-5">
                    <div className="col">
                        <button onClick={(e) => handleSubmit1(e)} className="btn btn-danger" type="button">Dodaj termin operacji</button>
                    </div>
                    <div className="col">
                        <button onClick={(e) => handleSubmit2(e)} className="btn btn-danger" type="button">Zapisz pacjenta na operacje</button>
                    </div>
                </div>
            </form>
            <OperationsList/>
        </div>
    )
}

export default Operations
