import FormPayment from "dh-marvel/components/forms/form-payment";
import { renderWithReactHookForm } from "dh-marvel/components/forms/utils/test-utils";
import { screen, waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StepperProvider, {
  TReducerState,
} from "dh-marvel/components/forms/context/stepper-context";
import { StepperNavigationProps } from "dh-marvel/components/forms/navigation/stepper-navigation";
import useStepper from "dh-marvel/components/forms/context/useStepper";

const mockStepperNavigationProps = jest.fn();
jest.mock("dh-marvel/components/forms/navigation/stepper-navigation", () =>
  jest.fn((props: StepperNavigationProps) => {
    mockStepperNavigationProps(props);

    return (
      <div>
        StepperNavigation:
        <div>
          <button onClick={props.onNextClick}>Finalizar</button>
        </div>
      </div>
    );
  })
);

jest.mock("dh-marvel/components/forms/context/useStepper");
const mockUseStepper = useStepper as jest.MockedFunction<typeof useStepper>;
const mockDispatch = jest.fn();
mockUseStepper.mockReturnValue({
  state: {} as TReducerState,
  dispatch: mockDispatch,
});

describe("FormPayment", () => {
  describe("when rendering default form", () => {
    it("should render the heading", () => {
      render(
        <StepperProvider>
          <FormPayment />
        </StepperProvider>
      );
      expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
    });
  });
  describe("when rendering submitting form", () => {
    xit("should hit the dispatch", async () => {
      render(
        <StepperProvider>
          <FormPayment />
        </StepperProvider>
      );
      await userEvent.type(screen.getByRole(/textbox/i, { name: "Nombre como aparece en la tarjeta" }), "Pepe pepardo");
      await userEvent.type(screen.getByRole(/textbox/i, { name: "Número de tarjeta" }), "4242424242424242");
      await userEvent.type(screen.getByRole(/textbox/i, { name: "Exp MM/YY" }), "12/29");
      await userEvent.type(screen.getByRole(/passbox/i), "123");
      await userEvent.click(screen.getByRole("button", { name: "Finalizar" }));
      /* await waitFor(() => {
        expect(mockDispatch).toBeCalledWith({
          type: "CONFIRM_PURCHASE",
        });
      }); */
    });
  });
});
