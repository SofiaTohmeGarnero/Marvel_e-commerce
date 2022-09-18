import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import {
  getCharacter,
  getCharacters,
  getComicsFromCharacter,
} from "dh-marvel/services/marvel/marvel.service";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import Grid from "@mui/material/Unstable_Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Image from "next/image";
import IComic from "types/IComic";
import ICharacter from "types/ICharacter";
import ComicCard from "dh-marvel/components/cards/comic-card";

type CharacterDetailProps = {
  character: ICharacter;
  comics: IComic[];
};
const CharacterDetail: NextPage<CharacterDetailProps> = ({ character, comics }) => {
  return (
    <>
      <Head>
        <title>{`MARVEL | ${character.name}`}</title>
        <meta
          name="character detail"
          content={`Information about ${character.name}`}
        />
      </Head>

      <BodySingle title={character.name}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            margin: "0 auto",
            width: "95vw",
            "@media (min-width: 768px)": {
              width: "50vw",
            },
          }}
        >
          <Grid xs={12} sx={{ textAlign: "center" }}>
            <Image
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={`image-${character.name}`}
              width={320}
              height={320}
            />
          </Grid>
          <Grid xs={12}>
            <Accordion key={`biografia-${character.id}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`biografia-character${character.id}-content`}
                id={`biografia-character${character.id}-header`}
              >
                <Typography fontWeight={600}>Biografía</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {character.description
                    ? character.description
                    : "Sin biografía disponible"}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        {comics.length > 0 && (
          <>
            <Box
              mt={6}
              mb={6}
              sx={{ borderBottom: "1.5px solid #34495E", width: " 100%" }}
            >
              <Typography variant="h5">
                {`Otros comics de ${character.name}`}
              </Typography>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }} mb={6}>
              {comics.map((comic: IComic) => (
                <ComicCard comic={comic} key={comic.id} />
              ))}
            </Grid>
          </>
        )}
      </BodySingle>
    </>
  );
};

(CharacterDetail as any).Layout = LayoutGeneral;
export default CharacterDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getCharacters();
  const characters: ICharacter[] = await response;

  const paths = characters.map((character) => ({
    params: { id: String(character.id) },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id: number = parseInt(params?.id as string);
  const character = await getCharacter(id);
  const comics = await getComicsFromCharacter(id);
  return {
    props: {
      character,
      comics,
    }
  };
};
