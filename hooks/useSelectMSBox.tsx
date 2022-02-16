import { useContext } from "react";
import { MsBoxContext } from "../contexts/msBoxContext";

const UseSelectMSBox = () => {
  const { state, dispatch } = useContext(MsBoxContext);

  return { mobileSuits: state.mobileSuits, useMS: state.useMS, dispatch };
};

export default UseSelectMSBox;
