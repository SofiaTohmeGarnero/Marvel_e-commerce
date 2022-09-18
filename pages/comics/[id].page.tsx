import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import Grid from "@mui/material/Unstable_Grid2";
import DetailCard from "dh-marvel/components/cards/detail-card";
import DetailAccordion from "dh-marvel/components/accordions/detail-accordion";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const ComicDetail: NextPage<Props> = ({ comic }) => {
  return (
    <>
      <Head>
        <title>{`MARVEL | ${comic.title}`}</title>
        <meta
          name="comic detail"
          content={`Information about ${comic.title}`}
        />
      </Head>

      <BodySingle title={comic.title}>
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
          <Grid container xs={12} sx={{ alignItems: "center" }}><DetailCard item={comic}></DetailCard></Grid>
          <Grid xs={12} mb={3} ><DetailAccordion item={comic}></DetailAccordion></Grid>
        </Grid>
      </BodySingle>
    </>
  );
};

(ComicDetail as any).Layout = LayoutGeneral;
export default ComicDetail;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id: number = parseInt(query.id as string);
  const response = await getComic(id);

  return {
    props: {
      comic: response,
    },
  };
};
