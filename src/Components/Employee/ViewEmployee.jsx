import React, { useEffect, useState } from 'react';
import ManageEmployee from './ManageEmployee';
import APICommunicator from '../API/APICommunicator';

export default function Employee(props)
{
    const handleShowModal = props.handleShowModal;

    const [employee, setEmployee] = useState([]);

    useEffect(() => {   
        fetchData();
    },[]);

    const fetchData = async () => {
        const response = await APICommunicator().getRequest("Employee/GetEmployee");
        if(response.state === "success")
        {
            setEmployee(response.msg);
        }
        else
        {
            props.handleToast(response);
        }
    };

    const DeleteEmployee = async (id) =>{
        try 
        {
            const isConfirmed = window.confirm("Are you sure you want to delete this item?");
            if(isConfirmed)
            {
                const response = await APICommunicator().deleteRequest("Employee/DeleteEmployee/"+ id);
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
            <h3 className='mt-4 text-center text-secondary'>Manage Employee</h3>
            <div className="mt-4 text-end">
                <button type="button" onClick={() => handleShowModal(
                <ManageEmployee employeeRefresh={fetchData} handleCloseModal={props.handleCloseModal}
                handleToast={props.handleToast} />)} className="btn btn-success"
            ><i class="fa-solid fa-plus"></i>&nbsp;Add Employee</button>
            </div>
            <div style={{overflowX:'scroll', overflowY:'hidden'}}>
                <table className="table tabele-responsive table-bordered border-secondary table-hover text-center mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>#ID</th>
                            <th>NAME</th>
                            <th>E-MAIL</th>
                            <th>DOB</th>
                            <th>AGE</th>
                            <th>SALARY</th>
                            <th>DPT_CODE</th>
                            <th>DPT_NAME</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>                          
                        {
                            employee.map((e, i) => {
                                return <tr key={i}>
                                    <th>{e.id}</th>
                                    <td>{e.firstname + " " + e.lastname}</td>
                                    <td>{e.email}</td>
                                    <td>{new Date(e.dateofbirth).toISOString().split('T')[0]}</td>
                                    <td>{e.age}</td>
                                    <td>{e.salary}</td>
                                    <td>{e.departmentcode}</td>
                                    <td>{e.departmentName}</td>
                                    <td className="text-center">
                                        <button type="button" 
                                            onClick={() => handleShowModal(
                                            <ManageEmployee employeeRefresh={fetchData} handleCloseModal={props.handleCloseModal}
                                            handleToast={props.handleToast} id={e.id}/>)}
                                            className="btn btn-primary btn-sm me-1" value={"Update"}
                                        ><i class="fa-solid fa-pen"></i></button>
                                        <button type="button"
                                            onClick={() => DeleteEmployee(e.id)}
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
        </div>
    );
}