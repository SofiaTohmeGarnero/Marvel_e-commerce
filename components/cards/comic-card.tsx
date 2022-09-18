import type { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IComic from "types/IComic";
import Link from "next/link";

type ComicCardProps = {
    comic: IComic
}
const ComicCard: FC<ComicCardProps> = ({comic}) => {

  return (
    <Grid xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345, height: "100%", margin: "0 auto" }}>
        <CardMedia
          component="img"
          height="140"
          image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={`img-${comic.title}`}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 140px)",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="body1" component="div">
              {comic.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">COMPRAR</Button>
            <Link href={`/comics/${comic.id}`}><Button size="small">VER DETALLE</Button></Link>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default ComicCard;
