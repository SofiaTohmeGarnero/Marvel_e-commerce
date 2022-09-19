import { NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import FormCheckout from "dh-marvel/components/forms/form-checkout";
import React, { useContext, useEffect } from "react";
import { StepperContext } from "dh-marvel/components/forms/context/stepper-context";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Checkout: NextPage = () => {
  const { state } = useContext(StepperContext);
  const router = useRouter();

  useEffect(() => {
    if (!state.comicId) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>MARVEL | Checkout</title>
        <meta name="checkout form" content="Form to make the buyout" />
      </Head>
      {state.comicId ? (
        <BodySingle title={`Checkout: ${state.checkout.order.name}`}>
          <FormCheckout />
        </BodySingle>
      ) : (
        <Box sx={{ marginTop: "16px", width: "100%", textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

(Checkout as any).Layout = LayoutCheckout;
export default Checkout;
