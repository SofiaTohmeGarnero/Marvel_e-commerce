import type { FC } from "react";
import IComic from "types/IComic";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

type DetailAccordionProps = {
  item: IComic;
};
const DetailAccordion: FC<DetailAccordionProps> = ({ item }) => {
  return (
    <>
      <Accordion key={`description-${item.id}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`description-item${item.id}-content`}
          id={`description-item${item.id}-header`}
        >
          <Typography fontWeight={600}>Descripción</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {item.description ? item.description : "Sin descripción disponible"}
          </Typography>
        </AccordionDetails>
      </Accordion>
      {item.characters.items.length > 0 && (
        <Accordion key={`character-${item.id}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`character-item${item.id}-content`}
            id={`character-item${item.id}-header`}
          >
            <Typography fontWeight={600}>Personajes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {item.characters.items.map((character: any) => {
                const characterUrl = character.resourceURI.split("/");
                return (
                  <Grid xs={12} md={4} key={character.name} sx={{ textAlign: "center" }}>
                    <Link
                      href={`/personajes/${
                        characterUrl[characterUrl.length - 1]
                      }`}
                    >
                      <Button variant="text">{character.name}</Button>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default DetailAccordion;
