import IComic from "types/IComic";
import DetailAccordion from "dh-marvel/components/accordions/detail-accordion";
import { render, screen } from "@testing-library/react";

const itemMockComplete: IComic = {
  id: 1158,
  characters: {
    items: [
      {
        name: "Beast (Ultimate)",
        resourceURI: "http://gateway.marvel.com/v1/public/characters/1010908",
      },
    ],
  },
  description:
    "On the edge of alcoholism and a failed marriage, Bob Reynolds wakes up to discover his true nature. A forgotten hero, he must unravel the conspiracy to erase his memory from mankind before an evil entity returns.",
  format: "Trade Paperback",
  oldPrice: 87,
  price: 72,
  stock: 2,
  title: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB (Trade Paperback)",
  thumbnail: {
    extension: "jpg",
    path: "http://i.annihil.us/u/prod/marvel/i/mg/2/f0/4bc6670c80007",
  },
};

const itemMockIncomplete: IComic = {
  id: 82970,
  characters: {
    items: [],
  },
  description: "",
  format: "",
  oldPrice: 48,
  price: 48,
  stock: 0,
  title: "Marvel Previews (2017)",
  thumbnail: {
    extension: "jpg",
    path: "http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada",
  },
};

describe("DetailAccordion", () => {
    describe("when rendering card with complete props", () => {
      it("should render description", () => {
        render(<DetailAccordion item={itemMockComplete} />);
        const description = screen.getByText(itemMockComplete.description);        
        expect(description).toBeInTheDocument();
      });
      it("should render a characters accordion", () => {
        render(<DetailAccordion item={itemMockComplete} />);
        const characterButton = screen.getByRole("button", {name: /personajes/i});
        expect(characterButton).toBeInTheDocument();
      });
    });
    describe("when rendering card with incomplete props", () => {
      it("should show a message that says out of description ", () => {
        render(<DetailAccordion item={itemMockIncomplete} />);
        const description = screen.getByText(/Sin descripción disponible/i);
        expect(description).toBeInTheDocument();
      });
      it("should not show the characters accordion  ", () => {
        render(<DetailAccordion item={itemMockIncomplete} />);
        const accordion = screen.queryByText(/personajes/i);
        expect(accordion).not.toBeInTheDocument();
      });
    });
});