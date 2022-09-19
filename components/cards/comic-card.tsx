import { FC } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IComic from "types/IComic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { StepperContext } from "dh-marvel/components/forms/context/stepper-context";

type ComicCardProps = {
  comic: IComic;
};
const ComicCard: FC<ComicCardProps> = ({ comic }) => {
  const router = useRouter();
  const { dispatch } = useContext(StepperContext);
  const handleClick = () => {
    fetch(`http://localhost:3000/api/comics/${comic.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stock > 0) {
          dispatch({ type: "UPLOAD_ORDER", payload: data });
          router.push("/checkout");
        } else {
          router.push(`/comics/${data.id}`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Grid xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345, height: "100%", margin: "0 auto" }}>
        <CardMedia
          component="img"
          height="140"
          image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={`img-${comic.title}`}
        />
        <Stack
          flexDirection="column"
          justifyContent="space-between"
          sx={{ height: "calc(100% - 140px)" }}
        >
          <CardContent>
            <Typography gutterBottom variant="body1" component="div">
              {comic.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleClick}>
              COMPRAR
            </Button>
            <Link href={`/comics/${comic.id}`}>
              <Button size="small">VER DETALLE</Button>
            </Link>
          </CardActions>
        </Stack>
      </Card>
    </Grid>
  );
};

export default ComicCard;
