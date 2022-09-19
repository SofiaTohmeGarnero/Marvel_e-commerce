import * as yup from "yup";

export const SchemaPersonalInformation = yup.object({
    firstname: yup.string().required("Nombre es un campo obligatorio"),
    lastname: yup.string().required("Apellido es un campo obligatorio"),
    email: yup.string().required("Email es un campo obligatorio").email("Email no válido"),
}).required();

export type PersonalInformationData = {
    firstname: string,
    lastname: string,
    email: string
}