import {
  AddressData,
  SchemaAddress,
} from "dh-marvel/components/forms/yup-schemas/schema-address";

describe("SchemaAddress", () => {
  describe("when validating a complete address schema", () => {
    it("should return true", async () => {
      const user: AddressData = {
        address1: "Calle falsa 123",
        address2: "",
        city: "Mendoza",
        state: "Mendoza",
        zipCode: "5500",
      };
      expect(await SchemaAddress.isValid(user)).toBeTruthy();
    });
  });
  describe("when validating a schema without fields", () => {
    it("should return false", async () => {
      const user: AddressData = {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      };
      expect(await SchemaAddress.isValid(user)).toBeFalsy();
    });
  });
});
