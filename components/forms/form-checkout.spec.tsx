import FormCheckout from "dh-marvel/components/forms/form-checkout";
import { screen, render } from "@testing-library/react";
import useStepper from "dh-marvel/components/forms/context/useStepper";
import { TReducerState } from "dh-marvel/components/forms/context/stepper-context";
import StepperProvider from "dh-marvel/components/forms/context/stepper-context";
import { renderWithReactHookForm } from "dh-marvel/components/forms/utils/test-utils";

jest.mock("dh-marvel/components/forms/context/useStepper");
const mockUseStepper = useStepper as jest.MockedFunction<typeof useStepper>;
const mockDispatch = jest.fn();

jest.mock("dh-marvel/components/forms/form-personal-information", () => () => {
    return <div>PersonalInformationForm</div>
})
jest.mock("dh-marvel/components/forms/form-address", () => () => {
    return <div>FormAddress</div>
}) 
jest.mock("dh-marvel/components/forms/form-payment", () => () => {
    return <div>FormPayment</div>
}) 

describe("FormCheckout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("when rendering default form", () => {
    it("should render the step 0 with PersonalInformationForm", () => {
      mockUseStepper.mockReturnValue({
        state: {
          activeStep: 0,
          checkout: {
            order: {
              name: "Spider",
              image: "valid.jpg",
              price: 100,
            },
          },
        } as TReducerState,
        dispatch: mockDispatch,
      });
      render(
        <StepperProvider>
          <FormCheckout />
        </StepperProvider>
      );
      const form1 = screen.getByText("PersonalInformationForm");
      const form2 = screen.queryByText("FormAddress");
      expect(form1).toBeInTheDocument();
      expect(form2).not.toBeInTheDocument();
    });
  });
  describe("when submitting PersonalInformationForm", () => {
    it("should render the step 1 with FormAddress", () => {
      
      mockUseStepper.mockReturnValue({
        state: {
          activeStep: 1,
          checkout: {
            order: {
              name: "Spider",
              image: "valid.jpg",
              price: 100,
            },
          },
        } as TReducerState,
        dispatch: mockDispatch,
      });
      render(
        <StepperProvider>
          <FormCheckout />
        </StepperProvider>
      );
      const form1 = screen.queryByText("PersonalInformationForm");
      const form2 = screen.getByText("FormAddress");
      expect(form1).not.toBeInTheDocument();
      expect(form2).toBeInTheDocument();
    });
  });
  describe("when submitting FormAddress", () => {
    it("should render the step 1 with FormPayment", () => {
        mockUseStepper.mockReturnValue({
            state: {
              activeStep: 2,
              checkout: {
                order: {
                  name: "Spider",
                  image: "valid.jpg",
                  price: 100,
                },
              },
            } as TReducerState,
            dispatch: mockDispatch,
          });
      render(
        <StepperProvider>
          <FormCheckout />
        </StepperProvider>
      );
      
      const form1 = screen.queryByText("PersonalInformationForm");
      const form2 = screen.queryByText("FormAddress");
      const form3 = screen.getByText("FormPayment");
      expect(form1).not.toBeInTheDocument();
      expect(form2).not.toBeInTheDocument();
      expect(form3).toBeInTheDocument();
    });
  });
});
