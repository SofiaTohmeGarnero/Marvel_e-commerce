import {
  PaymentData,
  SchemaPayment,
} from "dh-marvel/components/forms/yup-schemas/schema-payment";

describe("SchemaPayment", () => {
  describe("when validating a complete payment schema", () => {
    it("should return true", async () => {
      const user: PaymentData = {
        number: "4242424242424242",
        cvc: "123",
        expDate: "12/29",
        nameOnCard: "Pepe pepardo",
      };
      expect(await SchemaPayment.isValid(user)).toBeTruthy();
    });
  });
  describe("when validating a schema without fields", () => {
    it("should return false", async () => {
      const user: PaymentData = {
        number: "",
        cvc: "",
        expDate: "",
        nameOnCard: "",
      };
      expect(await SchemaPayment.isValid(user)).toBeFalsy();
    });
  });
  describe("when validating a schema with a longer number field and cvc field", () => {
    it("should return false", async () => {
      const user: PaymentData = {
        number: "424242424242424242",
        cvc: "1234",
        expDate: "12/29",
        nameOnCard: "Pepe pepardo",
      };
      expect(await SchemaPayment.isValid(user)).toBeFalsy();
    });
  });
});
