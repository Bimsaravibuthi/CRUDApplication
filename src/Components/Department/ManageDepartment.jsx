import React, { useEffect } from "react";
import APICommunicator from "../API/APICommunicator";
import { useFormik } from 'formik';
import { ManageDepartmentValidation } from "./ManageDepartmentValidation";

export default function ManageDepartment(props)
{
    const formValues =
    {
        code: '',
        name: '',
    };

    useEffect(() => {   
        if(props.id){ fetchDepartmentData(); }
    },[]);

    const fetchDepartmentData = async () =>{
        try
        {           
            const response = await APICommunicator().getRequest("Department/GetDepartment/" + props.id);
            setValues({
                code: response.msg[0].code,
                name: response.msg[0].name
            });
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const {values, handleBlur, handleChange, handleSubmit, errors, setValues} = useFormik({
        initialValues: formValues,
        validationSchema: ManageDepartmentValidation,
        onSubmit: (values) => {

            const requestBody = {
                code: values.code,
                name: values.name
            }

            if(props.id) { updateDepartment(requestBody); } 
            else { addDepartment(requestBody); }
        }
    })

    const addDepartment = async (requestBody) => {
        try 
        {
            const response = await APICommunicator().postRequest("Department/AddDepartment", requestBody);
            props.handleToast(response);
            props.departmentRefresh();
            props.handleCloseModal();
        } 
        catch (error)
        {
            console.log(error);
        }
    };

    const updateDepartment = async (requestBody) => {
        try 
        {      
            const response = await APICommunicator().putRequest("Department/UpdateDepartment/" + props.id, requestBody);
            props.handleToast(response);
            props.departmentRefresh();
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
                    <h4>{props.id ? 'Update Department' : 'Add Department'}</h4>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-6">
                            <div className="input-group">
                                <span class="input-group-text">CODE</span>
                                <input type="text" name="code" className="form-control"
                                    value={values.code}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </div>    
                            { errors.code && <span className="text-danger">{errors.code}</span> }                  
                        </div>
                        <div className="col-6">
                            <input type="text" name="name" className="form-control"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                             { errors.name && <span className="text-danger">{errors.name}</span> }  
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