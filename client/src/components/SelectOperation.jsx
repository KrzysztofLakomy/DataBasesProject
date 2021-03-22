import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';
import OperationDateSelect from './OperationDateSelect';

const SelectOperation = () => {
    const [operations, setOperations] = useState([]);
    const [operation, setOperation] = useState("");

    let history = useHistory();
    const location = useLocation();

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/operations/");
                setOperations(response.data.data.operations);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const handleReset = () => {
        history.push("/");
        history.push(location.pathname);
    }

    return (
        <div>
            <form action="">
                <div className="row d-flex justify-content-center">
                    <button type="submit" onClick={handleReset} className="btn btn-primary">Reset</button>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        {!operation && (
                            <>
                            <label htmlFor="ope">Wybor operacji</label>
                            <select value={operation} onChange={(e) => setOperation(e.target.value)}id="ope" className="form-select custom-select custom-select-lg">
                                <option value="" disabled hidden defaultValue>Wybor operacji</option>
                                {operations && operations.map(op => {
                                    return (
                                        <option key={op.id_operacja} value={op.id_operacja}>{op.nazwa} (lek. {op.imie} {op.nazwisko})</option>
                                    );
                                })}
                            </select>
                            </>
                        )}
                    </div>
                </div>
                {operation &&
                    <div className="row d-flex justify-content-center">
                        <div className="col-6">
                            <OperationDateSelect id_operation={operation}/>
                        </div>
                    </div>
                }
            </form>
        </div>
    )
}

export default SelectOperation
