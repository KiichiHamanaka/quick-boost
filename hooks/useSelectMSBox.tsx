import { useReducer } from "react";
import { msBoxInitialState, msBoxReducer } from "../store/selectMSBox";

const UseSelectMSBox = () => {
  const [state, dispatch] = useReducer(msBoxReducer, msBoxInitialState);

  // const callFM = useCallback(
  //     () => filterMS(cost, msName, seriesId),
  //     () => filterMS(cost, msName, seriesId),
  //     [cost, msName, seriesId]
  // );

  // フォームにしてuser/idにpostする

  return { mobileSuits: state.mobileSuits, dispatch };
};

export default UseSelectMSBox;
