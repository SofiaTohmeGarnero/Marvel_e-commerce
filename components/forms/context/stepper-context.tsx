import { createContext, Dispatch, ReducerStateWithoutAction, useReducer } from "react";
import { CheckoutInput } from "dh-marvel/types/checkout.types";

export type TReducerState = {
  activeStep: number,
  checkout: CheckoutInput
}

const initialState = {
  activeStep: 0,
  checkout: {
    customer: {
      name: "",
      lastname: "",
      email: "",
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
    card: {
      number: "",
      cvc: "",
      expDate: "",
      nameOnCard: "",
    },
    order: {
      name: "",
      image: "",
      price: 0
    },
  },
};

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        activeStep: state.activeStep + 1,
      };
    case "NEXT_STEP_PERSONAL":
      return {
        ...state,
        activeStep: state.activeStep + 1,
        checkout:{
          ...state.checkout,
          customer: {
            ...state.checkout.customer,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            email: action.payload.email
          }
        }
      };
    case "PREV_STEP":
      return {
        ...state,
        activeStep: state.activeStep - 1,
      };
    case "LATEST_STEP":
      return {
        ...state,
        activeStep: 0,
      };
    case "LATEST_STEP":
      return {
        ...state,
        activeStep: 0,
      };
    default:
      return state;
  }
};

export const StepperContext = createContext<{
  state: TReducerState;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default function StepperProvider({ children }:any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StepperContext.Provider value={{state, dispatch}}> {children} </StepperContext.Provider>
  );
}
