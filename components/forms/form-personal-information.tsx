import { Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "dh-marvel/components/forms/inputs/controlled-text-input";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SchemaPersonalInformation,
  PersonalInformationData,
} from "dh-marvel/components/forms/yup-schemas/schema-personal-information";
import StepperNavigation from "dh-marvel/components/forms/navigation/stepper-navigation";
import useStepper from "dh-marvel/components/forms/context/useStepper";

const FormPersonalInformation: FC = () => {
  const { dispatch } = useStepper();
  const methods = useForm<PersonalInformationData>({
    resolver: yupResolver(SchemaPersonalInformation),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      /* name: "Pepe",
      lastname: "Pepardo",
      email: "pepe@dh.com", */
    },
  });
  const { setFocus, handleSubmit } = methods;

  const onSubmit: any = (data: PersonalInformationData) => {
    dispatch({ type: "NEXT_STEP_PERSONAL", payload: data });
    console.log(data);
  };

  useEffect(() => {
    setFocus("name");
  }, []);

  return (
    <Stack>
      <h4>Datos personales</h4>
      <form>
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Nombre" />
          <ControlledTextInput name="lastname" label="Apellido" />
          <ControlledTextInput name="email" label="Email" />
        </FormProvider>
      </form>
      <StepperNavigation onNextClick={handleSubmit(onSubmit)} />
    </Stack>
  );
};

export default FormPersonalInformation;
