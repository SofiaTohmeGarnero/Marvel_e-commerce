import { FC } from "react";
import { CardData } from "dh-marvel/components/forms/yup-schemas/schema-payment";
import { Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import ControlledTextInput from "./controlled-text-input";

type CardInputsProps = {
  value: CardData;
  onChange: (card: CardData) => void;
};

const CardInputs: FC<CardInputsProps> = ({
  value,
  onChange,
}: CardInputsProps) => {
  const { number, cvc, expDate, nameOnCard } = value;

  const { control } = useFormContext();
  return (
    <>
    <ControlledTextInput name="nameOnCard" label="Nombre" />
      <Controller
        control={control}
        name="nameOnCard"
        render={({
          field: { onChange, value, ref },
          /* fieldState: { invalid, isTouched, isDirty, error },
          formState, */
        }) => (
          <TextField
            onChange={(event) => {
              onChange({
                ...value,
                nameOnCard: event.target.value,
              });
            }}
            value={nameOnCard}
            label={"Nombre como aparece en la tarjeta"}
            fullWidth
            inputRef={ref}
            /* error={!!errors[nameOnCard]}
        helperText={`${errors[nameOnCard]?.message || ""}`}
        inputRef={...ref.nameOnCard} */
          />
        )}
      />

      <TextField
        onChange={(event) => {
          onChange({
            ...value,
            number: event.target.value,
          });
        }}
        value={number}
        label={"Número de tarjeta"}
        fullWidth
        /* inputRef={ref[number]} */
      />
      <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
        <TextField
          onChange={(event) => {
            onChange({
              ...value,
              expDate: event.target.value,
            });
          }}
          value={expDate}
          label={"Exp MM/YY"}
          fullWidth
          /* inputRef={ref[expDate]} */
        />
        <TextField
          onChange={(event) => {
            onChange({
              ...value,
              cvc: event.target.value,
            });
          }}
          value={cvc}
          label={"CVC"}
          fullWidth
          type={"password"}
          /* cvc={ref[cvc]} */
        />
      </Stack>
    </>
  );
};

export default CardInputs;
