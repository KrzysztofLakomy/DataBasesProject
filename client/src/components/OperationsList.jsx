import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Hospital from '../apis/Hospital';

const OperationsList = () => {

    const [operations, setOperations] = useState([]);

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get(`/operation/patients`);
                setOperations(response.data.data.operations);

            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    return (
        <div>
            {operations && (
                        <>
                            <table className="table mb-4">
                            <thead>
                                <tr className="table-dark text-white">
                                    <th className="text-center" scope="col">Operacja</th>
                                    <th className="text-center" scope="col">Sala operacyjna</th>
                                    <th className="text-center" scope="col">Termin</th>
                                    <th className="text-center" scope="col">Lakarz</th>
                                    <th className="text-center" scope="col">Pacjent</th>
                                </tr>
                            </thead>
                            {operations && operations.map((op) => {
                                return(
                                    <tbody>
                                        <tr className="bg-primary text-white" key={op.id_operacja_pacjent}>
                                            <td className="text-center">{op.nazwa}</td>
                                            <td className="text-center">{op.sala_operacyjna}</td>
                                            <td className="text-center">{op.termin.substring(0,10)}</td>
                                            <td className="text-center">lek. {op.imie_l} {op.nazwisko_l}</td>
                                            <td className="text-center">{op.imie} {op.nazwisko}</td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                            </table>
                        </>
                    )}
        </div>
    )
}

export default OperationsList
