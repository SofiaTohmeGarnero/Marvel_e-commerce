import { createContext, Dispatch, useMemo, useReducer } from "react";
import { CheckoutInput } from "dh-marvel/types/checkout.types";
import IComic from "dh-marvel/types/IComic";
import { PersonalInformationData } from "../yup-schemas/schema-personal-information";
import { AddressData } from "../yup-schemas/schema-address";

export type TReducerState = {
  activeStep: number;
  checkout: CheckoutInput;
  comicId: number;
};

const initialState: TReducerState = {
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

type UploadOrder = {
  type: "UPLOAD_ORDER";
  payload: IComic;
};
type NextStepPersonal = {
  type: "NEXT_STEP_PERSONAL";
  payload: PersonalInformationData;
};
type NextStepAddress = {
  type: "NEXT_STEP_ADDRESS";
  payload: AddressData;
};
type PrevStep = {
  type: "PREV_STEP";
};
type ConfirmPurchase = {
  type: "CONFIRM_PURCHASE";
};

type TReducerAction =
  | UploadOrder
  | NextStepPersonal
  | NextStepAddress
  | PrevStep
  | ConfirmPurchase;

const reducer = (state: TReducerState, action: TReducerAction) => {
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
            image:
              action.payload.thumbnail.path +
              "." +
              action.payload.thumbnail.extension,
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
    case "PREV_STEP":
      return {
        ...state,
        activeStep: state.activeStep - 1,
      };
    case "CONFIRM_PURCHASE":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          card: {
            number: "",
            cvc: "",
            expDate: "",
            nameOnCard: "",
          },
        },
      };
    default:
      return state;
  }
};
export interface IStepperContext {
  state: TReducerState;
  dispatch: Dispatch<TReducerAction>;
}

export const StepperContext = createContext<IStepperContext | undefined>(
  undefined,
);

export default function StepperProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({
    state, 
    dispatch
}), [state, dispatch])

  return (
    <StepperContext.Provider value={value}>
      {children}
    </StepperContext.Provider>
  );
}
