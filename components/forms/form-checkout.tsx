import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { FC, useContext, useState } from "react";
import FormPersonalInformation from "dh-marvel/components/forms/form-personal-information";
import { StepperContext } from "dh-marvel/components/forms/context/stepper-context";


const FormCheckout: FC = () => {
    const { state } = useContext(StepperContext);
    const { activeStep } = state;
    console.log(state);
  
  return (
    <>
      <Box sx={{ width: "100%" }}>
          <Stepper
            sx={{ width: "100%", marginBottom: 2 }}
            activeStep={activeStep}
          >
            <Step>
              <StepLabel>Datos personales</StepLabel>
            </Step>
            <Step>
              <StepLabel>Dirección de entrega</StepLabel>
            </Step>
            <Step>
              <StepLabel>Datos del pago</StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 && <FormPersonalInformation />}
          {activeStep === 1 && <div>Address</div>}
          {activeStep === 2 && <div>Finalizado</div>}
      </Box>
    </>
  );
};

export default FormCheckout;
