import { screen } from "@testing-library/react";
import ControlledTextInput from "dh-marvel/components/forms/inputs/controlled-text-input";
import { renderWithReactHookForm } from "dh-marvel/components/forms/utils/test-utils";

describe("ControlledTextInput", () => {
  describe("when rendering default", () => {
    it("should render a texbox", () => {
      renderWithReactHookForm(
        <ControlledTextInput name={"name"} label={"Nombre"} />
      );
      const textbox = screen.getByRole(/textbox/i, { name: "Nombre" });
      expect(textbox).toBeInTheDocument();
      expect(textbox).toHaveValue("");
    });
    it("should render a texbox", () => {
      renderWithReactHookForm(
        <ControlledTextInput name={"name"} label={"Nombre"} />,
        { defaultValues: { name: "Pepe" } }
      );
      const textbox = screen.getByRole(/textbox/i, { name: "Nombre" });
      expect(textbox).toHaveValue("Pepe");
    });
  });
});
