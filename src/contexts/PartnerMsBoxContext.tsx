import React, { createContext, ReactNode, useReducer, Dispatch } from "react";
import {
  msBoxInitialState,
  msBoxReducer,
  msBoxState,
  MSBoxAction,
} from "../reducers/selectMSBox";

export const PartnerMsBoxContext = createContext(
  {} as { state: msBoxState; dispatch: Dispatch<MSBoxAction> }
);

type props = {
  children: ReactNode;
};

const PartnerMsBoxContextProvider: React.FC<props> = ({ children }) => {
  const [state, dispatch] = useReducer(msBoxReducer, msBoxInitialState);
  return (
    <PartnerMsBoxContext.Provider value={{ state, dispatch }}>
      {children}
    </PartnerMsBoxContext.Provider>
  );
};

export default PartnerMsBoxContextProvider;
