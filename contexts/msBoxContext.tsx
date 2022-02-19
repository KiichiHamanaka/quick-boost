import React, { createContext, ReactNode, useReducer, Dispatch } from "react";
import {
  msBoxInitialState,
  msBoxReducer,
  msBoxState,
  MSBoxAction,
} from "../reducers/selectMSBox";

export const MsBoxContext = createContext(
  {} as { state: msBoxState; dispatch: Dispatch<MSBoxAction> }
);

type props = {
  children: ReactNode;
};

const MsBoxContextProvider: React.FC<props> = ({ children }) => {
  const [state, dispatch] = useReducer(msBoxReducer, msBoxInitialState);
  return (
    <MsBoxContext.Provider value={{ state, dispatch }}>
      {children}
    </MsBoxContext.Provider>
  );
};

export default MsBoxContextProvider;
