import FormPersonalInformation from "dh-marvel/components/forms/form-personal-information";
import { renderWithReactHookForm } from "dh-marvel/components/forms/utils/test-utils";
import { screen, waitFor } from "@testing-library/react";
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

describe("FormPersonalInformation", () => {
  describe("when rendering default form", () => {
    it("should render the heading", () => {
      renderWithReactHookForm(
        <StepperProvider>
          <FormPersonalInformation />
        </StepperProvider>
      );
      expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
    });
  });
  describe("when rendering submitting form", () => {
    it("should hit the dispatch", async () => {
      renderWithReactHookForm(
        <StepperProvider>
          <FormPersonalInformation />
        </StepperProvider>
      );
      screen.debug()
      const input1 = screen.getByRole(/textbox/i, { name: "Nombre" });
      const input2 = screen.getByRole(/textbox/i, { name: "Apellido" });
      const input3 = screen.getByRole(/textbox/i, { name: "Email" });
      expect(input1).toBeInTheDocument()
      expect(input1).toHaveValue('')
      await userEvent.type(input1, "Pepe")
      await userEvent.type(input2, "Pepardo")
      await userEvent.type(input3, "pepe@dh.com")
      expect(input1).toHaveValue('Pepe')
      await userEvent.click(screen.getByRole("button", { name: "Siguiente" }));
      await waitFor(() => {
        expect(mockDispatch).toBeCalledWith({
          payload: {
            name: "Pepe",
            lastname: "Pepardo",
            email: "pepe@dh.com",
          },
          type: "NEXT_STEP_PERSONAL",
        });
      });
    });
  });
});
