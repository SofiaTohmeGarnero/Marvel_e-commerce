import { render, screen, waitFor } from "@testing-library/react";
import StepperNavigation from "./stepper-navigation";
import userEvent from "@testing-library/user-event";

const mockOnNextClick = jest.fn();

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
      expect(backBtn).not.toBeInTheDocument();
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
});
