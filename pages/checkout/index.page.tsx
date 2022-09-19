import { NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import FormCheckout from "dh-marvel/components/forms/form-checkout";
import React, { useContext } from "react";
import { StepperContext } from "dh-marvel/components/forms/context/stepper-context";

const Checkout: NextPage = () => {
  const { state } = useContext(StepperContext);

  return (
    <>
      <Head>
        <title>MARVEL | Checkout</title>
        <meta name="checkout form" content="Form to make the buyout" />
      </Head>

      <BodySingle title={`Checkout: ${state.checkout.order.name}`}>
        <FormCheckout />
      </BodySingle>
    </>
  );
};

(Checkout as any).Layout = LayoutCheckout;
export default Checkout;
