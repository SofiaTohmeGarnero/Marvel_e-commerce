import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const ComicDetail: NextPage<Props> = ({comic}) => {
  console.log(comic);
  return (
    <>
      <Head>
        <title>{`MARVEL | ${comic.title}`}</title>
        <meta name="comic detail" content={`Information about ${comic.title}`} />
      </Head>

      <BodySingle title={comic.title}>
        <p>comic</p>
      </BodySingle>
    </>
  );
};

(ComicDetail as any).Layout = LayoutGeneral;
export default ComicDetail;

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const id: number = parseInt(query.id as string);
  const response = await getComic(id);
    
  return {
    props: {
      comic: response
    },
  };
}; 