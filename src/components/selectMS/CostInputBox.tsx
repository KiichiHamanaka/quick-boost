import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch } from "react";
import { Cost } from "../../types/Union";
import { MSBoxAction, msBoxState } from "../../reducers/selectMSBox";

type Props = {
  state: msBoxState;
  dispatch: Dispatch<MSBoxAction>;
};

const CostInputBox: React.FC<Props> = ({ state, dispatch }) => {
  const handleChange = (event: SelectChangeEvent) => {
    dispatch({ type: "cost", cost: event.target.value as Cost });
  };

  return (
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
  );
};

export default CostInputBox;
