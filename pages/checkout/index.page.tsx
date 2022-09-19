import { NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import Grid from "@mui/material/Unstable_Grid2";
import FormCheckout from "dh-marvel/components/forms/form-checkout";
import StepperProvider from "dh-marvel/components/forms/context/stepper-context";

const Checkout: NextPage = () => {
  return (
    <>
      <Head>
        <title>MARVEL | Checkout</title>
        <meta name="checkout form" content="Form to make the buyout" />
      </Head>

      <BodySingle title={`Checkout: `}>
        <Grid container>
          <Grid xs={12} md={3}>
            Card
          </Grid>
          <StepperProvider>
            <Grid xs={12} md={9}>
              <FormCheckout />
            </Grid>
          </StepperProvider>
        </Grid>
      </BodySingle>
    </>
  );
};

(Checkout as any).Layout = LayoutCheckout;
export default Checkout;
