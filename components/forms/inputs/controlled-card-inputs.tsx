import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import { CardData } from "dh-marvel/components/forms/yup-schemas/schema-payment";
import CardInput from "dh-marvel/components/forms/inputs/card.inputs";

const ControlledCardInputs: FC = () => {
  const { control, setValue } = useFormContext();
  const {
    field: { value },
    formState: { errors },
  } = useController<Record<string, CardData>>({
    name: "card",
    control,
    defaultValue: { number: "", cvc: "", expDate: "", nameOnCard: "" },
  });

  return (
    <CardInput
      value={value}
      // value={{
      // cardNumber: value.cardNumber,
      // expDate: value.expDate
      // }}
      onChange={(card: CardData) => {
        setValue("card", card);
      }}
    />
  );
};

export default ControlledCardInputs;
