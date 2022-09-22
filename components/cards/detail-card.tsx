import type { FC } from "react";
import IComic from "types/IComic";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Grid from "@mui/material/Unstable_Grid2";
import useStepper from "dh-marvel/components/forms/context/useStepper";

type DetailCardProps = {
  item: IComic;
};
const DetailCard: FC<DetailCardProps> = ({ item }) => {
  const { dispatch } = useStepper();
  const handleClick = () => {
    dispatch({ type: "UPLOAD_ORDER", payload: item });
  }
  return (
    <>
      <Grid xs={12} md={6} sx={{ textAlign: "center" }}>
        <Image
          src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          alt={`image-${item.title}`}
          width={200}
          height={350}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <Card variant="outlined" sx={{ padding: 2 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {item.format}
            </Typography>
            <Typography variant="h5" component="div">
              {item.title}
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              {item.oldPrice != item.price && (
                <Typography color="text.secondary">
                  {`Antes $${item.oldPrice}`}
                </Typography>
              )}
              <Typography variant="h6">{`$${item.price}`}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Link href="/checkout">
              <Button
                variant="contained"
                disabled={!item.stock}
                endIcon={item.stock ? <AddShoppingCartIcon /> : null}
                sx={{ width: "100%", mb: 2 }}
                onClick={handleClick}
              >
                {item.stock ? "Comprar" : "Sin stock disponible"}
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default DetailCard;
