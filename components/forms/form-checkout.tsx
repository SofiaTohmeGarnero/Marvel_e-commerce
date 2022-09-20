import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { FC, useContext } from "react";
import FormPersonalInformation from "dh-marvel/components/forms/form-personal-information";
import FormAddress from "dh-marvel/components/forms/form-address";
import FormPayment from "dh-marvel/components/forms/form-payment";
import { StepperContext } from "dh-marvel/components/forms/context/stepper-context";
import Grid from "@mui/material/Unstable_Grid2";
import CheckoutCard from "dh-marvel/components/cards/checkout-card";

const FormCheckout: FC = () => {
  const { state } = useContext(StepperContext);
  const { activeStep } = state;

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
        <Grid container spacing={4} >
          <Grid xs={12} md={3} sx={{marginTop:'16px'}}>
            <CheckoutCard />
          </Grid>
          <Grid xs={12} md={9}>
            {activeStep === 0 && <FormPersonalInformation />}
            {activeStep === 1 && <FormAddress />}
            {activeStep === 2 && <FormPayment />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FormCheckout;
