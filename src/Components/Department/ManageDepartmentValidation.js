import * as Yup from 'yup';

export const ManageDepartmentValidation = Yup.object({
    code: Yup.string().max(2, "Allowed only 2 characters").required("CODE is required"),
    name: Yup.string().max(30, "Allowed only 30 characters").required("Department name is required")
})