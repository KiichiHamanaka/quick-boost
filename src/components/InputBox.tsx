import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Dispatch } from "react";

type Props<T, U> = {
  labelName: string;
  menuItem: Array<string>;
  dv?: any;
  handleChange?: any;
  dispatch?: Dispatch<T>;
  actionList?: Array<U>;
};

const InputBox = (props: Props<any, any>) => {
  return (
    <Box sx={{ minWidth: "200px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.labelName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={props.labelName}
          defaultValue={props.dv}
          onChange={props.handleChange}
        >
          {props.menuItem.map((item, idx) => (
            <MenuItem key={idx} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default InputBox;
