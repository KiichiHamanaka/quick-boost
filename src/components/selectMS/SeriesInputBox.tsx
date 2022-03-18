import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { SeriesDict } from "../../db/data/SeriesDict";
import React, { Dispatch } from "react";
import { MSBoxAction, msBoxState } from "../../reducers/selectMSBox";

type Props = {
  state: msBoxState;
  dispatch: Dispatch<MSBoxAction>;
};

const SeriesInputBox: React.FC<Props> = ({ state, dispatch }) => {
  const handleChange = (event: SelectChangeEvent) => {
    event.target.value === "ALL"
      ? dispatch({ type: "seriesId", seriesId: event.target.value })
      : dispatch({ type: "seriesId", seriesId: parseInt(event.target.value) });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">シリーズ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="sid"
          defaultValue={String(state.seriesId)}
          onChange={handleChange}
        >
          <MenuItem value={"ALL"}>ALL</MenuItem>
          {Object.values(SeriesDict).map((s, idx) => (
            <MenuItem key={idx} value={s.seriesId}>
              {s.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SeriesInputBox;
