import { Button, Stack } from "@mui/material";
import { FC } from "react";
import useStepper from "dh-marvel/components/forms/context/useStepper";

export type StepperNavigationProps = {
  onNextClick: () => void;
};

const StepperNavigation: FC<StepperNavigationProps> = ({ onNextClick }) => {
  const { state, dispatch } = useStepper();
  const { activeStep } = state;
  return (
    <Stack mt={2} mb={2} direction="row" justifyContent="space-between">
      {activeStep !== 0 && (
        <Button onClick={() => dispatch({ type: "PREV_STEP" })}>
          Anterior
        </Button>
      )}
      <Button
        onClick={onNextClick}
        variant="contained"
        sx={{ margin: "0 0 0 auto" }}
      >
        {activeStep === 2 ? "Finalizar" : "Siguiente"}
      </Button>
    </Stack>
  );
};

export default StepperNavigation;
