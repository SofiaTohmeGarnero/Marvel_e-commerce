import type { NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import faqsData from "../data/faqs.json";
import IFaq from "types/IFaq";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faqs: NextPage = () => {
  const faqs: IFaq[] = faqsData;
  
  return (
    <>
      <Head>
        <title>MARVEL | FAQs</title>
        <meta name="description" content="Frequently asked questions" />
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
