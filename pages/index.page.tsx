import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import Grid from "@mui/material/Unstable_Grid2";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import IComic from "types/IComic";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import ComicCard from "dh-marvel/components/cards/comic-card";

const LIMIT = 12;
const FIRST_OFFSET = 0;

export type IndexProps = {
  comicsFirstRender: IComic[];
  totalComics: number;
};

const Index: NextPage<IndexProps> = ({ comicsFirstRender, totalComics }) => {
  const totalPages = Math.ceil(totalComics / LIMIT);
  const [page, setPage] = useState(1);
  const [comics, setComics] = useState(comicsFirstRender);
  const nextOffset = (page - 1) * LIMIT;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const url = "/api/comics?";
    const params = new URLSearchParams();
    params.set("offset", `${nextOffset}`);
    params.set("limit", `${LIMIT}`);
    fetch(url + params.toString())
      .then((res) => res.json())
      .then((data) => setComics(data))
      .catch((e) => {
        console.log(e);
      });
  }, [page, nextOffset]);

  return (
    <>
      <Head>
        <title>MARVEL | Home</title>
        <meta name="description" content="List of comics" />
        <link rel="icon" href="/favicon-marvel.ico" />
      </Head>

      <BodySingle title={"Comics"}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {comics.map((comic: IComic) => (
            <ComicCard comic={comic} key={comic.id} />
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", p: 3, m: 1 }}>
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </BodySingle>
    </>
  );
};

(Index as any).Layout = LayoutGeneral;

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const response = await getComics(FIRST_OFFSET, LIMIT);

  return {
    props: {
      comicsFirstRender: response.data.results,
      totalComics: response.data.total,
    },
  };
};
