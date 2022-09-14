import { render, screen } from "@testing-library/react";
import Faqs from "dh-marvel/pages/faqs.page";
import faqsData from "../data/faqs.json";

describe("FaqsPage", () => {
  describe("when rendering default", () => {
    it("should render the title", () => {
      render(<Faqs />);
      const title = screen.getByText("Preguntas Frecuentes");
      expect(title).toBeInTheDocument();
    });

    it("should render the questions", () => {
      render(<Faqs />);
      const questions = screen.getAllByRole(/button/i);
      expect(questions).toHaveLength(faqsData.length);
    });
    
  });
});


