import React, { createContext, useState } from 'react'

export const HospitalContext = createContext();

export const HospitalContextProvider = props => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState([]);
    const [selectedWard, setSelectedWard] = useState([]);

    const addDoctors = (doctor) => {
        setDoctors([...doctors, doctor]);
    };

    const addPatients = (patient) => {
        setPatients([...patients, patient]);
    };

    return(
        <HospitalContext.Provider value={{doctors, setDoctors, patients, setPatients, addDoctors, addPatients ,selectedDoctor, setSelectedDoctor, diseases, setDiseases, selectedPatient, setSelectedPatient, selectedWard, setSelectedWard}}>
            {props.children}
        </HospitalContext.Provider>
    );
}