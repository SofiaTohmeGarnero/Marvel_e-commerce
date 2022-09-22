import * as yup from "yup";

export const SchemaAddress = yup
  .object({
    address1: yup.string().required("Dirección es un campo obligatorio"),
    city: yup.string().required("Ciudad es un campo obligatorio"),
    state: yup.string().required("Provincia es un campo obligatorio"),
    zipCode: yup.string().required("Código postal es un campo obligatorio"),
  })
  .required();

export type AddressData = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
};
