import React, { useState, useEffect } from "react";
import APICommunicator from "../API/APICommunicator";
import { useFormik } from 'formik';
import { ManageEmployeeValidation } from "./ManageEmployeeValidation";

export default function ManageEmployee(props)
{
    const formValues =
    {
        firstname: '',
        lastname: '',
        email: '',
        dateofbirth: Date(),
        salary: '',
        departmentId: 0,
    };

    const [departmentSelect, setDepartmentSelect] = useState([]);

    useEffect(() => {   
        const fetchData = async () =>{
            await fetchDepartmentList();

            if(props.id) 
            { 
                await fetchEmployeeData();
            }
        };  
        fetchData();  
    },[props.id]);

    const fetchEmployeeData = async () => {
        try
        {
            const response = await APICommunicator().getRequest("Employee/GetEmployee/" + props.id);
            setValues({
                id: 0,
                firstname: response.msg[0].firstname,
                lastname: response.msg[0].lastname,
                email: response.msg[0].email,
                dateofbirth: new Date(response.msg[0].dateofbirth).toISOString().split('T')[0],
                age: 0,
                salary: response.msg[0].salary,
                departmentId: response.msg[0].departmentId
            });
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const fetchDepartmentList = async () => {
        try 
        {
          const response = await APICommunicator().getRequest("Department/GetDepartment");
          setDepartmentSelect(response.msg);
        } 
        catch (error) 
        {
            console.log(error);
        }
    };

    const {values, handleBlur, handleChange, handleSubmit, errors, setValues} = useFormik({
        initialValues: formValues,
        validationSchema: ManageEmployeeValidation,
        onSubmit: (values) => {
            const requestBody = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                dateofbirth: values.dateofbirth,
                salary: values.salary,
                department: values.departmentId
            }
    
            if(props.id) { updateEmployee(requestBody); }
            else { addEmployee(requestBody); }
        }
    })

    const addEmployee = async (requestBody) => {
        try 
        {
          const response = await APICommunicator().postRequest("Employee/AddEmployee", requestBody);
          props.handleToast(response);
          props.employeeRefresh();
          props.handleCloseModal();
        } 
        catch (error)
        {
            console.log(error);
        }
    };

    const updateEmployee = async (requestBody) => {
        try 
        {     
            console.log(requestBody);    
            const response = await APICommunicator().putRequest("Employee/UpdateEmployee/" + props.id, requestBody);         
            props.handleToast(response);
            props.employeeRefresh();
            props.handleCloseModal();
        } 
        catch (error)
        {
            console.log(error);
        }
    };

    return(
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className="mb-4 text-center">
                    <h4>{props.id ? 'Update Employee' : 'Add Employee'}</h4>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-6">
                            <input type="text" name="firstname" className="form-control" placeholder="First Name"
                                value={values.firstname}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            { errors.firstname && <span className="text-danger">{errors.firstname}</span> } 
                        </div>
                        <div className="col-6">
                            <input type="text" name="lastname" className="form-control" placeholder="Last Name"
                                value={values.lastname}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            { errors.lastname && <span className="text-danger">{errors.lastname}</span> } 
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-6">
                            <input type="text" name="email" className="form-control" placeholder="Email Address"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            { errors.email && <span className="text-danger">{errors.email}</span> } 
                        </div>
                        <div className="col-6">
                            <input type="date" name="dateofbirth" className="form-control" pattern="\d{4}-\d{2}-\d{2}" placeholder="Date of Birth"
                                value={values.dateofbirth}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-6">
                            <input type="text" name="salary" className="form-control" placeholder="Salary"
                                value={values.salary}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            { errors.salary && <span className="text-danger">{errors.salary}</span> } 
                        </div>
                        <div className="col-6">
                            <div className="input-group">
                                <span class="input-group-text">Department</span>
                                <select name="departmentId" className="form-select" aria-label="Default select example"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    {
                                        departmentSelect.map((d, i) =>{
                                            return <option key={i} value={d.id} selected={d.id === values.departmentId}>{d.code}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="text-end">
                    <input type="submit" className="btn btn-primary me-1" value={"Submit"}/>
                    <input type="reset" className="btn btn-warning" value={"Clear"}/>
                </div>
            </form>
        </div>
    );
}