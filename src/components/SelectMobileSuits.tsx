import React, { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MSList from "./selectMS/MSList";
import useSelectMSBox from "../hooks/useSelectMSBox";
import { Grid, TextField } from "@mui/material";
import SeriesInputBox from "./selectMS/SeriesInputBox";
import CostInputBox from "./selectMS/CostInputBox";
import Divider from "@mui/material/Divider";
import { MsBoxContext } from "../contexts/MsBoxContext";
import { PartnerMsBoxContext } from "../contexts/PartnerMsBoxContext";

type Props = {
  whichOne: "self" | "partner";
};

export const SelectMobileSuits = (props: Props) => {
  const {
    state,
    partnerState,
    useMS,
    partnerUseMS,
    dispatch,
    partnerDispatch,
  } = useSelectMSBox(MsBoxContext, PartnerMsBoxContext);
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

  const [isFav, setIsFav] = useState<boolean>(false);

  const [ms, setMS] = useState(state.mobileSuits);
  const [pms, setPMS] = useState(partnerState.mobileSuits);
  const cState = props.whichOne === "self" ? state : partnerState;
  const cms = props.whichOne === "self" ? ms : pms;
  const cUseMs = props.whichOne === "self" ? useMS : partnerUseMS;
  const cDispatch = props.whichOne === "self" ? dispatch : partnerDispatch;

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    cDispatch({ type: "msName", msName: event.target.value });
  };

  useEffect(() => {
    let result = state.mobileSuits;
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

  useEffect(() => {
    let result = partnerState.mobileSuits;
    if (partnerState.cost !== "ALL") {
      result = result.filter((m) => m.cost === partnerState.cost);
    }
    if (partnerState.seriesId !== "ALL") {
      result = result.filter((m) => m.series === partnerState.seriesId);
    }
    if (partnerState.msName !== "") {
      result = result.filter((m) => m.name.includes(partnerState.msName));
    }
    setPMS(result);
  }, [partnerState]);

  if (loading) return null;
  return (
    <Grid container sx={{ display: "flex", flexDirection: "column" }}>
      <Grid item>
        <SeriesInputBox />
      </Grid>
      <Grid item>
        <CostInputBox />
      </Grid>
      <TextField
        onChange={handleChange}
        label="名前検索"
        variant="outlined"
        defaultValue={cState.msName}
      />
      <Divider variant="middle" />
      {!isFav ? (
        <MSList mobileSuits={cms} useMS={cUseMs} dispatch={cDispatch} />
      ) : (
        <div>お気に入りMSが登録されていません</div>
      )}
    </Grid>
  );
};

export default SelectMobileSuits;
