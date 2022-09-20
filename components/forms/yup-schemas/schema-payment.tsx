import * as yup from "yup";

export const SchemaPayment = yup
  .object({
    number: yup.string().max(16, "Como máximo puede ingresar 16 caracteres").required("Número de tarjeta es un campo obligatorio"),
    cvc: yup.string().max(3,"Debe los 3 números del código de seguridad").required("CVC es un campo obligatorio"),
    expDate: yup.string().required("Fecha de vencimiento es un campo obligatorio"),
    nameOnCard: yup.string().required("Nombre es un campo obligatorio"),
  })
  .required();

export type CardData = {
    number: string,
    cvc: string,
    expDate: string,
    nameOnCard: string
};

export type PaymentData = {
  card: CardData
}
