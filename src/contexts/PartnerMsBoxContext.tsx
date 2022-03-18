import React, { createContext, ReactNode, useReducer, Dispatch } from "react";
import {
  msBoxInitialState,
  msBoxReducer,
  msBoxState,
  MSBoxAction,
} from "../reducers/selectMSBox";

export const PartnerMsBoxContext = createContext(
  {} as { partnerState: msBoxState; partnerDispatch: Dispatch<MSBoxAction> }
);

type props = {
  children: ReactNode;
};

const PartnerMsBoxContextProvider: React.FC<props> = ({ children }) => {
  const [partnerState, partnerDispatch] = useReducer(
    msBoxReducer,
    msBoxInitialState
  );
  return (
    <PartnerMsBoxContext.Provider value={{ partnerState, partnerDispatch }}>
      {children}
    </PartnerMsBoxContext.Provider>
  );
};

export default PartnerMsBoxContextProvider;
