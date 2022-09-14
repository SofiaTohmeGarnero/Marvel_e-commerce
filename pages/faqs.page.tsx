import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import faqsData from "../data/faqs.json";
import IFaq from "types/IFaq";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type FaqsProps = {
  faqs: IFaq[];
};

const Faqs: NextPage<FaqsProps> = ({ faqs }: FaqsProps) => {
  return (
    <>
      <Head>
        <title>MARVEL | FAQs</title>
        <meta name="description" content="Frequently asked questions" />
        <link rel="icon" href="/favicon-marvel.ico" />
      </Head>

      <BodySingle title={"Preguntas Frecuentes"}>
        {faqs.map((faq) => {
          return (
            <Accordion key={faq.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq${faq.id}-content`}
                id={`faq${faq.id}-header`}
              >
                <Typography fontWeight={600}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </BodySingle>
    </>
  );
};

export default Faqs;

export const getStaticProps: GetStaticProps = async () => {
  const data = await faqsData;

  return {
    props: {
      faqs: data,
    },
  };
};
