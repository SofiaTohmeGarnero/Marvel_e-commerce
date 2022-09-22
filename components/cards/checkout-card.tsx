import { FC } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useStepper from "dh-marvel/components/forms/context/useStepper";
const CheckoutCard: FC = () => {
  const { state } = useStepper();
  const { order } = state.checkout;

  return (
      <Card sx={{ width: "100%", height: "100%", margin: "0 auto" }}>
        <CardMedia
          component="img"
          height="450"
          image={order.image}
          alt={`img-${order.name}`}
        />
        <Stack
          flexDirection="column"
          justifyContent="center"
          sx={{ height: "calc(100% - 450px)", textAlign: "center"}}
        >
          <CardContent>
            <Typography variant="body1" component="div" fontWeight={600}>
              {order.name}
            </Typography>
            <Typography variant="h6">{`$${order.price}`}</Typography>
          </CardContent>
        </Stack>
      </Card>
  );
};

export default CheckoutCard;
