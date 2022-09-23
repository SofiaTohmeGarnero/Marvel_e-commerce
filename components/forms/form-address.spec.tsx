import FormAddress from "dh-marvel/components/forms/form-address";
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
          <button onClick={props.onNextClick}>Siguiente</button>
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

describe("FormAddress", () => {
  describe("when rendering default form", () => {
    it("should render the heading", () => {
      render(
        <StepperProvider>
          <FormAddress />
        </StepperProvider>
      );
      expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
    });
  });
  describe("when rendering submitting form", () => {
    it("should hit the dispatch", async () => {
      render(
        <StepperProvider>
          <FormAddress />
        </StepperProvider>
      );
      const input1 = screen.getByRole(/textbox/i, {
        name: "Dirección y número",
      });
      const input2 = screen.getByRole(/textbox/i, { name: "Ciudad" });
      const input3 = screen.getByRole(/textbox/i, { name: "Provincia" });
      const input4 = screen.getByRole(/textbox/i, { name: "Cod postal" });

      await userEvent.type(input1, "Calle falsa 123");
      await userEvent.type(input2, "Mendoza");
      await userEvent.type(input3, "Mendoza");
      await userEvent.type(input4, "5500");
      await userEvent.click(screen.getByRole("button", { name: "Siguiente" }));
      await waitFor(() => {
        expect(mockDispatch).toBeCalledWith({
          payload: {
            address1: "Calle falsa 123",
            city: "Mendoza",
            state: "Mendoza",
            zipCode: "5500",
          },
          type: "NEXT_STEP_ADDRESS",
        });
      });
    });
  });
});
