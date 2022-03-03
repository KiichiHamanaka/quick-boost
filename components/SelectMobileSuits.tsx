import React, { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MSList from "./selectMS/MSList";
import useSelectMSBox from "../hooks/useSelectMSBox";
import { Input } from "@mui/material";
import SeriesInputBox from "./selectMS/SeriesInputBox";
import CostInputBox from "./selectMS/CostInputBox";

export const SelectMobileSuits = () => {
  const { state, mobileSuits, useMS, dispatch } = useSelectMSBox();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  // const [favMS, setFavMS] = useState<MobileSuit[]>([]);
  //
  // const favoriteMSMemo: MobileSuit[] = useMemo(
  //   () => (session ? fms(session.user.favoriteMSIDs) : []),
  //   [session]
  // );
  //
  // const updateFavMS = useCallback(
  //   () => setFavMS(favoriteMSMemo),
  //   [favoriteMSMemo]
  // );
  //
  // useEffect(() => {
  //   if (session) {
  //     updateFavMS();
  //   }
  // }, [session]);

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({ type: "msName", msName: event.target.value });
  };

  const [isFav, setIsFav] = useState<boolean>(false);

  const [ms, setMS] = useState(mobileSuits.mobileSuits);

  useEffect(() => {
    let result = mobileSuits.mobileSuits;
    if (state.cost !== "ALL") {
      result = result.filter((m) => m.cost === state.cost);
    }
    if (state.seriesId !== "ALL") {
      result = result.filter((m) => m.series === state.seriesId);
    }
    if (state.msName !== "") {
      result = result.filter((m) => m.name.includes(state.msName));
    }
    setMS(result);
  }, [state]);

  if (loading) return null;
  return (
    <div>
      <SeriesInputBox />
      <CostInputBox />
      <Input onChange={handleChange} />
      {!isFav ? (
        <MSList mobileSuits={ms} useMS={useMS} />
      ) : (
        // ) : favMS.length ? (
        //   <MSList mobileSuits={favMS} useMS={useMS} />
        <div>お気に入りMSが登録されていません</div>
      )}
    </div>
  );
};

export default SelectMobileSuits;
