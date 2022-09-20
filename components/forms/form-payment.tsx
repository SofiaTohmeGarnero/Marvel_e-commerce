import React, { FC, useEffect, useContext, useState } from "react";
import { StepperContext } from "dh-marvel/components/forms/context/stepper-context";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "dh-marvel/components/forms/inputs/controlled-text-input";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "dh-marvel/components/forms/navigation/stepper-navigation";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  CardData,
  PaymentData,
  SchemaPayment,
} from "dh-marvel/components/forms/yup-schemas/schema-payment";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";
import ControlledCardInputs from "dh-marvel/components/forms/inputs/controlled-card-inputs";

const FormPayment: FC = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(StepperContext);
  const [error, setError] = useState("");
  console.log(state);

  const methods = useForm<PaymentData>({
    //resolver: yupResolver(SchemaPayment),
    defaultValues: {
      card: {
        number: "4242424242424242",
        cvc: "123",
        expDate: "12/29",
        nameOnCard: "Pepe pepardo",
      },
    },
  });
  /* const {neastedMethods} = useForm<CardData>({
    resolver: yupResolver(SchemaPayment),
    },
  }); */
  const { setFocus, handleSubmit, watch } = methods;
  const card = watch("card");

  const onSubmit: any = (data: PaymentData) => {
    console.log('Hola'+ data);
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

  /*  useEffect(() => {
    setFocus('nameOnCard');
  }, []); 
 */
  return (
    <Stack>
      <h4>Datos del pago</h4>
        <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid xs={12} md={6} lg={8}>
              <ControlledCardInputs />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <Cards
                number={card.number}
                cvc={card.cvc}
                expiry={card.expDate}
                name={card.nameOnCard}
              />
            </Grid>
          </Grid>
      </form>
      <StepperNavigation onNextClick={handleSubmit(onSubmit)} />
        </FormProvider>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
};

export default FormPayment;
