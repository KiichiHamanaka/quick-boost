import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import useSelectMSBox from "../../hooks/useSelectMSBox";
import { Cost } from "../../types/Union";
import { MsBoxContext } from "../../contexts/MsBoxContext";
import { PartnerMsBoxContext } from "../../contexts/PartnerMsBoxContext";

const CostInputBox = () => {
  const { state, dispatch } = useSelectMSBox(MsBoxContext, PartnerMsBoxContext);
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
