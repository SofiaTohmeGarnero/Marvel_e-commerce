import { render, screen, waitFor } from "@testing-library/react";
import StepperNavigation from "./stepper-navigation";
import userEvent from "@testing-library/user-event";
import useStepper from "dh-marvel/components/forms/context/useStepper";
import { TReducerState } from "dh-marvel/components/forms/context/stepper-context";

const mockOnNextClick = jest.fn();

jest.mock("dh-marvel/components/forms/context/useStepper");
const mockUseStepper = useStepper as jest.MockedFunction<typeof useStepper>;
const mockDispatch = jest.fn();
mockUseStepper.mockReturnValue({
  state: { activeStep: 1 } as TReducerState,
  dispatch: mockDispatch,
});

describe("StepperNavigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("when rendering default", () => {
    it("should show button to navigate forwards", () => {
      render(<StepperNavigation onNextClick={mockOnNextClick} />);
      const forwardsBtn = screen.getByRole(/button/i, { name: /siguiente/i });
      const backBtn = screen.queryByRole(/button/i, { name: /anterior/i });
      expect(forwardsBtn).toBeInTheDocument();
      expect(backBtn).toBeInTheDocument();
    });
  });
  describe("when clicking on forwads", () => {
    it("should show buttons to navigate forwards and back", async () => {
      render(<StepperNavigation onNextClick={mockOnNextClick} />);
      const forwardsBtn = screen.getByRole(/button/i, { name: /siguiente/i });
      userEvent.click(forwardsBtn);
      await waitFor(() => {
        expect(mockOnNextClick).toHaveBeenCalled();
      });
    });
  });
  describe("when clicking on back", () => {
    it("should hit the dispatch", async () => {
      render(<StepperNavigation onNextClick={mockOnNextClick} />);
      const backBtn = screen.getByRole(/button/i, { name: /anterior/i });
      userEvent.click(backBtn);
      await waitFor(() => {
        expect(mockDispatch).toBeCalledWith({
          type: "PREV_STEP",
        });
      });
    });
  });
});
