import IComic from "types/IComic";
import DetailCard from "dh-marvel/components/cards/detail-card";
import { render, screen } from "@testing-library/react";
import StepperProvider from "dh-marvel/components/forms/context/stepper-context";

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

describe("DetailCard", () => {
  describe("when rendering default", () => {
    it("should render the title and image of the card", () => {
      render(
        <StepperProvider>
          <DetailCard item={itemMockComplete} />
        </StepperProvider>
      );
      const title = screen.getByText(itemMockComplete.title);
      const image = screen.getByRole(/img/i);
      expect(title).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });
  });
  describe("when rendering a comic with stock", () => {
    it("should show buy button", () => {
      render(
        <StepperProvider>
          <DetailCard item={itemMockComplete} />
        </StepperProvider>
      );
      const button = screen.getByText(/comprar/i);
      expect(button).toBeInTheDocument();
    });
  });

  describe("when rendering a comic without stock", () => {
    it("should show a button that says out of stock", () => {
      render(
        <StepperProvider>
          <DetailCard item={itemMockIncomplete} />
        </StepperProvider>
      );
      const button = screen.getByText(/Sin stock disponible/i);
      expect(button).toBeInTheDocument();
    });
  });
  describe("when rendering a comic whose current price is different to the older", () => {
    it("should render both of prices", () => {
      render(
        <StepperProvider>
          <DetailCard item={itemMockComplete} />
        </StepperProvider>
      );
      const oldPrice = screen.getByText("Antes $87");
      const price = screen.getByText("$72");
      expect(oldPrice).toBeInTheDocument();
      expect(price).toBeInTheDocument();
    });
  });
  describe("when rendering a comic whose current price is equal to the older", () => {
    it("should render only the current price", () => {
      render(
        <StepperProvider>
          <DetailCard item={itemMockIncomplete} />
        </StepperProvider>
      );
      const oldPrice = screen.queryByText(
        `Antes $${itemMockIncomplete.oldPrice}`
      );
      const price = screen.getByText(`$${itemMockIncomplete.price}`);
      expect(oldPrice).not.toBeInTheDocument();
      expect(price).toBeInTheDocument();
    });
  });
});
