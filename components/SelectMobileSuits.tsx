import React, {
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fms, MobileSuit } from "../types/MobileSuit";
import { useSession } from "next-auth/react";
import MSList from "./selectMS/MSList";
import { useThreads } from "../hooks/swrHooks";
import useSelectMSBox from "../hooks/useSelectMSBox";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Cost } from "../types/Union";
import { SeriesDict } from "../db/data/SeriesDict";

export const SelectMobileSuits = () => {
  // ここにコスト,シリーズ,FavMSフィルタをつける

  const { threadDispatch } = useThreads();
  const { state, mobileSuits, useMS, dispatch } = useSelectMSBox();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [favMS, setFavMS] = useState<MobileSuit[]>([]);

  const favoriteMSMemo: MobileSuit[] = useMemo(
    () => (session ? fms(session.user.favoriteMSIDs) : []),
    [session]
  );

  const updateFavMS = useCallback(
    () => setFavMS(favoriteMSMemo),
    [favoriteMSMemo]
  );

  useEffect(() => {
    if (session) {
      updateFavMS();
    }
  }, [session]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch({ type: "cost", cost: event.target.value as Cost });
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    event.target.value === "ALL"
      ? dispatch({ type: "seriesId", seriesId: event.target.value })
      : dispatch({ type: "seriesId", seriesId: parseInt(event.target.value) });
  };

  const handleChange3 = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({ type: "msName", msName: event.target.value });
  };

  const [isFav, setIsFav] = useState<boolean>(false);
  const [word, setWord] = useState<string | null>(null);

  const initialMS = mobileSuits.mobileSuits;
  const [ms, setMS] = useState(initialMS);

  //ダイアログがcloseされたときにinputの選択した値が保持されない

  useEffect(() => {
    let result = initialMS;
    result =
      state.cost !== "ALL"
        ? result.filter((m) => m.cost === state.cost)
        : result;
    result =
      state.seriesId !== "ALL"
        ? result.filter((m) => m.series === state.seriesId)
        : result;
    result =
      state.msName !== ""
        ? result.filter((m) => m.name.includes(state.msName))
        : result;
    setMS(result);
    console.log(state);
  }, [state]);

  if (loading) return null;
  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">シリーズ</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="sid"
            defaultValue={String(state.seriesId)}
            onChange={handleChange2}
          >
            <MenuItem value={"ALL"}>ALL</MenuItem>
            {Object.values(SeriesDict).map((s, idx) => (
              <MenuItem key={idx} value={s.seriesId}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">コスト</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="cost"
            onChange={handleChange}
            defaultValue={String(state.cost)}
          >
            <MenuItem value={"ALL"}>ALL</MenuItem>
            <MenuItem value={"1500"}>1500</MenuItem>
            <MenuItem value={"2000"}>2000</MenuItem>
            <MenuItem value={"2500"}>2500</MenuItem>
            <MenuItem value={"3000"}>3000</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Input onChange={handleChange3} />
      {!isFav ? (
        <MSList mobileSuits={ms} useMS={useMS} />
      ) : favMS.length ? (
        <MSList mobileSuits={favMS} useMS={useMS} />
      ) : (
        <div>お気に入りMSが登録されていません</div>
      )}
    </div>
  );
};

export default SelectMobileSuits;
