import { FC, useEffect, useContext } from "react";
import { StepperContext } from "dh-marvel/components/forms/context/stepper-context";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "dh-marvel/components/forms/inputs/controlled-text-imput";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "dh-marvel/components/forms/navigation/stepper-navigation";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  AddressData,
  SchemaAddress,
} from "dh-marvel/components/forms/yup-schemas/schema-address";

const FormAddress: FC = () => {
  const { dispatch } = useContext(StepperContext);
  const methods = useForm<AddressData>({
    resolver: yupResolver(SchemaAddress),
    defaultValues: {
      address1: "Calle falsa 123",
      city: "Mendoza",
      state: "Mendoza",
      zipCode: "5500",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const onSubmit: any = (data: AddressData) => {
    dispatch({ type: "NEXT_STEP_ADDRESS", payload: data });
  };

  useEffect(() => {
    setFocus("address1");
  }, []);
  return (
    <Stack>
      <h4>Dirección de entrega</h4>
      <form>
        <FormProvider {...methods}>
          <ControlledTextInput name="address1" label="Dirección y número" />
          <ControlledTextInput
            name="address2"
            label="Departamento, piso, etc"
          />
          <ControlledTextInput name="city" label="Ciudad" />
          <Grid container columnSpacing={2}>
            <Grid xs={12} md={9}>
              <ControlledTextInput name="state" label="Provincia" />
            </Grid>
            <Grid xs={12} md={3}>
              <ControlledTextInput name="zipCode" label="Cod postal" />
            </Grid>
          </Grid>
        </FormProvider>
      </form>
      <StepperNavigation onNextClick={handleSubmit(onSubmit)} />
    </Stack>
  );
};

export default FormAddress;
