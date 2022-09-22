import { NextPage } from "next";
import Head from "next/head";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import Grid from "@mui/material/Unstable_Grid2";
import CheckoutCard from "dh-marvel/components/cards/checkout-card";
import TextCard from "dh-marvel/components/cards/text-card";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import useStepper from "dh-marvel/components/forms/context/useStepper";

const SuccessfulPurchase: NextPage = () => {
  const { state } = useStepper();
  const { customer } = state.checkout;
  const router = useRouter();

  useEffect(() => {
    if (!state.comicId) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>MARVEL | Successful purchase</title>
        <meta
          name="successful purchase"
          content="Successful purchase confirmation"
        />
      </Head>

      {state.comicId ? (
        <BodySingle>
          <Stack
            sx={{
              margin: "16px auto",
              width: "95vw",
              "@media (min-width: 768px)": {
                width: "60vw",
              },
            }}
            mx={{ width: "60%" }}
            spacing={2}
          >
            <Grid container>
              <Grid xs={12}>
                <Box
                  sx={{
                    backgroundColor: "#73C6B6",
                    borderRadius: "6px",
                    color: "white",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <Typography fontWeight={600} fontSize={28}>
                    FELICITACIONES
                  </Typography>
                </Box>
              </Grid>
              <Grid
                xs={12}
                md={5}
                sx={{
                  marginTop: "16px",
                  "@media (min-width: 900px)": {
                    paddingRight: "16px",
                  },
                }}
              >
                <CheckoutCard />
              </Grid>
              <Grid xs={12} md={7} sx={{ marginTop: "16px" }}>
                <Stack direction="column" sx={{ height: "100%", gap: "16px" }}>
                  <TextCard
                    title={"Datos Personales"}
                    firstData={customer.name}
                    secondData={customer.email}
                  />
                  <TextCard
                    title={"Dirección de entrega"}
                    firstData={customer.address.address1}
                    secondData={`${customer.address.city}, ${customer.address.state} (${customer.address.zipCode})`}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </BodySingle>
      ) : (
        <Box sx={{ marginTop: "16px", width: "100%", textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

(SuccessfulPurchase as any).Layout = LayoutCheckout;
export default SuccessfulPurchase;
