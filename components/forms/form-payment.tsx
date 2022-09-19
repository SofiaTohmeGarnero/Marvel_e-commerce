import React, { FC, useEffect, useContext, useState } from "react";
import { StepperContext } from "dh-marvel/components/forms/context/stepper-context";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "dh-marvel/components/forms/inputs/controlled-text-imput";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "dh-marvel/components/forms/navigation/stepper-navigation";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  PaymentData,
  SchemaPayment,
} from "dh-marvel/components/forms/yup-schemas/schema-payment";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";

const FormPayment: FC = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(StepperContext);
  const [error, setError] = useState("");
  const [cardFields, setCardFields] = useState<PaymentData>({
    number: "",
    cvc: "",
    expDate: "",
    nameOnCard: "",
  });
  const methods = useForm<PaymentData>({
    resolver: yupResolver(SchemaPayment),
    defaultValues: {
      number: "4242424242424242",
      cvc: "123",
      expDate: "12/29",
      nameOnCard: "Pepe pepardo",
    },
  });
  const { setFocus, handleSubmit, watch } = methods;

  const onSubmit: any = (data: PaymentData) => {
    dispatch({ type: "NEXT_STEP_PAYMENT", payload: data });
    const url = "/api/checkout";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state.checkout),
    })
      .then((res) => res.json())
      .then((data) => {
        const apiError = JSON.stringify(data.message);
        if (apiError !== undefined) {
          setError(apiError);
          return;
        }
        setError("");
        router.push("/confirmacion-compra");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    setFocus("nameOnCard");
  }, []);

  useEffect(() => {
    watch((data: any) => {
      setCardFields(data);
    });
  }, [watch]);

  return (
    <Stack>
      <h4>Datos del pago</h4>
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6} lg={8}>
            <form>
              <ControlledTextInput
                name="nameOnCard"
                label="Nombre como aparece en la tarjeta"
              />
              <ControlledTextInput name="number" label="Número de tarjeta" />
              <Grid container columnSpacing={2}>
                <Grid xs={12} md={6}>
                  <ControlledTextInput name="expDate" label="Exp MM/YY" />
                </Grid>
                <Grid xs={12} md={6}>
                  <ControlledTextInput
                    name="cvc"
                    label="CVC"
                    inputType="password"
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Cards
              number={!!cardFields.number ? parseInt(cardFields.number) : ""}
              cvc={!!cardFields.cvc ? cardFields.cvc : ""}
              expiry={!!cardFields.expDate ? cardFields.expDate : ""}
              name={!!cardFields.nameOnCard ? cardFields.nameOnCard : ""}
            />
          </Grid>
        </Grid>
      </FormProvider>
      <StepperNavigation onNextClick={handleSubmit(onSubmit)} />
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
};

export default FormPayment;
