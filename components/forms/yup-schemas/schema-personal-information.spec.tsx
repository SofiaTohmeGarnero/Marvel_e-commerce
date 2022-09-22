import {
  SchemaPersonalInformation,
  PersonalInformationData,
} from "dh-marvel/components/forms/yup-schemas/schema-personal-information";

describe("SchemaPersonalInformation", () => {
  describe("when validating a complete personal-information schema", () => {
    it("should return true", async () => {
      const user: PersonalInformationData = {
        name: "Pepe",
        lastname: "Pepardo",
        email: "pepe@dh.com",
      };
      expect(await SchemaPersonalInformation.isValid(user)).toBeTruthy();
    });
  });
  describe("when validating a schema without fields", () => {
    it("should return false", async () => {
      const user: PersonalInformationData = {
        name: "",
        lastname: "",
        email: "",
      };
      expect(await SchemaPersonalInformation.isValid(user)).toBeFalsy();
    });
  });
  describe("when validating a schema with an invalid email", () => {
    it("should return false", async () => {
      const user: PersonalInformationData = {
        name: "Pepe",
        lastname: "Pepardo",
        email: "pepe.com",
      };
      expect(await SchemaPersonalInformation.isValid(user)).toBeFalsy();
    });
  });
});
