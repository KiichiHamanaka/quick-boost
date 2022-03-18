import { Context, Dispatch, useContext } from "react";
import {
  MSBoxAction,
  msBoxInitialState,
  msBoxState,
} from "../reducers/selectMSBox";

const UseSelectMSBox = (
  context: Context<{ state: msBoxState; dispatch: Dispatch<MSBoxAction> }>,
  partnerContext: Context<{
    partnerState: msBoxState;
    partnerDispatch: Dispatch<MSBoxAction>;
  }>
) => {
  const { state, dispatch } = useContext(context);
  const { partnerState, partnerDispatch } = useContext(partnerContext);
  return {
    state,
    partnerState,
    mobileSuits: msBoxInitialState,
    useMS: state.useMS,
    partnerUseMS: partnerState.useMS,
    dispatch,
    partnerDispatch,
  };
};

export default UseSelectMSBox;
