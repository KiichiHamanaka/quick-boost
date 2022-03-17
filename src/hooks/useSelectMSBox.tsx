import { useContext } from "react";
import { MsBoxContext } from "../contexts/MsBoxContext";
import { msBoxInitialState } from "../reducers/selectMSBox";

const UseSelectMSBox = () => {
  const { state, dispatch } = useContext(MsBoxContext);
  return {
    state,
    mobileSuits: msBoxInitialState,
    useMS: state.useMS,
    dispatch,
  };
};

export default UseSelectMSBox;