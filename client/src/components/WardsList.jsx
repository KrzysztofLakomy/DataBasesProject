import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Hospital from '../apis/Hospital';

const WardsList = () => {

    const [wards,setWards] = useState([]);

    let history = useHistory();
    const location = useLocation();

    useEffect( () =>{
        const fetchData = async () =>{
            try{
                const response = await Hospital.get("/wards/");
                setWards(response.data.data.wards);
            }catch(err){
                alert(err);
            }
        };
        fetchData();
    },[]);

    const handleWardSelect = (id) => {
        history.push(`/wards/${id}`);
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
            const response = await Hospital.delete(`/wards/${id}`);
            history.push(`/`);
            history.push(location.pathname);

        }catch(err){
            alert(err);
        }
    }

    return (
        <div className="mb-5">
            <table className="table table-hover">
                <thead>
                    <tr className="table-dark">
                        <th className="text-center" scope="col">Nazwa</th>
                        <th className="text-center" scope="col">Ordynator</th>
                        <th className="text-center" scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {wards && wards.map(ward => {
                        return (
                            <tr onClick={()=>handleWardSelect(ward.id_oddzial)} key={ward.id_oddzial}>
                                <td className="text-center">{ward.nazwa}</td>
                                <td className="text-center">{ward.ordynator}</td>
                                <td className="text-center"><button onClick={(e)=>handleDelete(e,ward.id_oddzial)} type="submit" className="btn btn-danger">Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default WardsList
