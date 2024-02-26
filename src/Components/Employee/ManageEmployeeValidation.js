import * as Yup from 'yup';

export const ManageEmployeeValidation = Yup.object({
    firstname: Yup.string().max(20, "Allowed only 20 characters").required("Firstname is required"),
    lastname: Yup.string().max(20, "Allowed only 20 characters").required("Lastname is required"),
    email: Yup.string().max(50, "Allowed only 20 characters").required("Email is required"),
    salary: Yup.number("Allowed only numbers").required("Salary is required"),
    departmentId: Yup.number().required()
})