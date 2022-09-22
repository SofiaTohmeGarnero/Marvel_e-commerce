import { render, screen } from "@testing-library/react";
import Index from "dh-marvel/pages/index.page";
import IComic from "types/IComic";
import StepperProvider from "dh-marvel/components/forms/context/stepper-context";

const comicsFirstRenderMock: IComic[] = [
  {
    id: 22582,
    characters: {
      items: [],
    },
    description: "",
    format: "",
    oldPrice: 48,
    price: 48,
    stock: 0,
    thumbnail: {
      extension: "http://i.annihil.us/u/prod/marvel/i/mg/8/c0/51dda501724ed",
      path: "jpg",
    },
    title: "Civil War (Hardcover)",
  },
  {
    id: 17486,
    characters: {
      items: [],
    },
    description: "",
    format: "",
    oldPrice: 48,
    price: 48,
    stock: 0,
    thumbnail: {
      extension: "http://i.annihil.us/u/prod/marvel/i/mg/6/50/4c3645d0d29e3",
      path: "jpg",
    },
    title: "X-Men: Phoenix - Warsong (2006)",
  },
];

describe("IndexPage", () => {
  describe("when rendering default", () => {
    it("should render the title", () => {
      render(
        <StepperProvider>
          <Index comicsFirstRender={comicsFirstRenderMock} totalComics={4400} />
        </StepperProvider>
      );
      const title = screen.getByText("Comics");
      expect(title).toBeInTheDocument();
    });

    it("should render the images of the cards", () => {
      render(
        <StepperProvider>
          <Index comicsFirstRender={comicsFirstRenderMock} totalComics={4400} />
        </StepperProvider>
      );
      const cards = screen.getAllByRole(/img/i);
      expect(cards).toHaveLength(comicsFirstRenderMock.length);
    });

    it("should render the pagination", () => {
      render(
        <StepperProvider>
          <Index comicsFirstRender={comicsFirstRenderMock} totalComics={4400} />
        </StepperProvider>
      );
      const pagination = screen.getByRole(/nav/i);
      expect(pagination).toBeInTheDocument();
    });
  });
});
