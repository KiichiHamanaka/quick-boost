import { useContext } from "react";
import { MsBoxContext } from "../contexts/msBoxContext";

const UseSelectMSBox = () => {
  const { state, dispatch } = useContext(MsBoxContext);

  // const callFM = useCallback(
  //     () => filterMS(cost, msName, seriesId),
  //     () => filterMS(cost, msName, seriesId),
  //     [cost, msName, seriesId]
  // );

  // フォームにしてuser/idにpostする

  return { mobileSuits: state.mobileSuits, useMS: state.useMS, dispatch };
};

export default UseSelectMSBox;
