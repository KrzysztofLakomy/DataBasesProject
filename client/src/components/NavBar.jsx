import React from 'react'
import { useHistory } from 'react-router-dom';

const NavBar = () => {
    let history = useHistory();

    const handleRegister = () => {
        history.push("/patients/register");
    }

    const handleAppointment = () => {
        history.push("/appointment/create");
    }

    const handleSignUp = () => {
        history.push("/appointment/signUp");
    }

    const handleOperation = () => {
        history.push("/operation")
    }

    return (
        <div className="mb-4">
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <a class="navbar-brand" href="/">
                <i class="fas fa-clinic-medical"></i>
                    Szpital
                </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link btn" href="/"> Glowna</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn" href="/doctors"> Lekarze</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn" href="/patients"> Pacjenci</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn" href="/diseases">Baza chorob</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn" href="/clinics">Poradnie</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn" href="/wards">Oddzialy</a>
                        </li>
                    </ul>
                    <span className="navbar-text mx-2">
                        <button onClick={handleOperation} type="submit" className="btn btn-primary">Operacje</button>
                    </span>
                    <span className="navbar-text">
                        <button onClick={handleSignUp} type="submit" className="btn btn-primary">Zapisz Sie</button>
                    </span>
                    <span className="navbar-text mx-2">
                        <button onClick={handleAppointment} type="submit" className="btn btn-primary">Utworz Wizyte</button>
                    </span>
                    <span className="navbar-text">
                        <button onClick={handleRegister} type="submit" className="btn btn-primary">Rejestruj Pacjenta</button>
                    </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
