import {
  createContext,
  Dispatch,
  useReducer,
} from "react";
import { CheckoutInput } from "dh-marvel/types/checkout.types";

export type TReducerState = {
  activeStep: number;
  checkout: CheckoutInput;
  comicId: number
};

const initialState = {
  activeStep: 0,
  comicId: 0,
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
      price: 0,
    },
  },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "UPLOAD_ORDER":
      return {
        ...state,
        activeStep: 0,
        comicId: action.payload.id,
        checkout: {
          ...state.checkout,
          order: {
            name: action.payload.title,
            image: action.payload.thumbnail.path + '.' + action.payload.thumbnail.extension,
            price: action.payload.price,
          },
        },
      };
    case "NEXT_STEP_PERSONAL":
      return {
        ...state,
        activeStep: state.activeStep + 1,
        checkout: {
          ...state.checkout,
          customer: {
            ...state.checkout.customer,
            name: action.payload.name,
            lastname: action.payload.lastname,
            email: action.payload.email,
          },
        },
      };
    case "NEXT_STEP_ADDRESS":
      return {
        ...state,
        activeStep: state.activeStep + 1,
        checkout: {
          ...state.checkout,
          customer: {
            ...state.checkout.customer,
            address: {
              address1: action.payload.address1,
              address2: action.payload.address2,
              city: action.payload.city,
              state: action.payload.state,
              zipCode: action.payload.zipCode,
            },
          },
        },
      };
    case "NEXT_STEP_PAYMENT":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          card: {
            number: action.payload.number,
            cvc: action.payload.cvc,
            expDate: action.payload.expDate,
            nameOnCard: action.payload.nameOnCard,
          },
        },
      };
    case "PREV_STEP":
      return {
        ...state,
        activeStep: state.activeStep - 1,
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

export default function StepperProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StepperContext.Provider value={{ state, dispatch }}>
      {children}
    </StepperContext.Provider>
  );
}
