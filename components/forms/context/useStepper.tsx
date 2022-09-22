import { useContext } from "react";
import { StepperContext, IStepperContext } from "dh-marvel/components/forms/context/stepper-context";

const useStepper = (): IStepperContext => {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error(
            'useOrder must be used within a OrderProvider'
        );
    }
    return context;
};

export default useStepper;