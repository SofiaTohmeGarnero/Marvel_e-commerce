import { Button, Stack } from "@mui/material";
import { FC, useContext } from "react";
import { StepperContext } from "dh-marvel/components/forms/context/stepper-context";

type StepperNavigationProps = {
  onNextClick: () => void;
};

const StepperNavigation: FC<StepperNavigationProps> = ({ onNextClick }) => {
  const { state, dispatch } = useContext(StepperContext);
  const { activeStep } = state;
  return (
    <Stack mt={2} direction="row" justifyContent="space-between">
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
