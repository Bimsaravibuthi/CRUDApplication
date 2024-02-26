import React, { useEffect, useState } from 'react';
import ManageDepartment from './ManageDepartment';
import APICommunicator from '../API/APICommunicator';

export default function Department(props)
{
    const handleShowModal = props.handleShowModal;

    const [department, setDepartment] = useState([]);

    useEffect(() => {   
        fetchData();
    },[]);

    const fetchData = async () => {

        const response = await APICommunicator().getRequest("Department/GetDepartment");
        if(response.state === "success")
        {
            setDepartment(response.msg);
        }
        else
        {
            props.handleToast(response);
        }
    };

    const DeleteDepartment = async (id) =>{
        try 
        {
            const isConfirmed = window.confirm("Are you sure you want to delete this item?");
            if(isConfirmed)
            {
                const response = await APICommunicator().deleteRequest("Department/DeleteDepartment/"+ id);
                props.handleToast(response);
                fetchData();
            }
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h3 className='mt-4 text-center text-secondary'>Manage Department</h3>
                    <div className="mt-4 text-end">
                        <button type="button" onClick={() => handleShowModal(
                        <ManageDepartment departmentRefresh={fetchData}
                        handleCloseModal={props.handleCloseModal}
                        handleToast={props.handleToast}/>)}
                        className="btn btn-success"
                    ><i class="fa-solid fa-plus"></i>&nbsp;Add Department</button>
                    </div>
                    <table className="table tabele-responsive table-bordered border-secondary table-hover text-center mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>#ID</th>
                                <th>CODE</th>
                                <th>NAME</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                department.map((d, i) => {
                                   return <tr key={i}>
                                        <th>{d.id}</th>
                                        <td>{d.code}</td>
                                        <td>{d.name}</td>
                                        <td className="text-center">
                                            <button type="button"
                                                onClick={() => handleShowModal(
                                                <ManageDepartment departmentRefresh={fetchData}
                                                handleCloseModal={props.handleCloseModal}
                                                handleToast={props.handleToast} id={d.id}/>)}
                                                className="btn btn-primary btn-sm me-1"
                                            ><i class="fa-solid fa-pen"></i></button>
                                            <button type="button"
                                                onClick={() => DeleteDepartment(d.id)}
                                                className="btn btn-danger btn-sm">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
}