import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import React, { Dispatch } from "react";

type Props<T, U> = {
  labelName: string;
  menuItem: Array<string>;
  dispatch?: Dispatch<T>;
  actionList?: Array<U>;
};

const InputBox = (props: Props<any, any>) => {
  return (
    <Box sx={{ maxWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {props.labelName}
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: props.labelName,
            id: "uncontrolled-native",
          }}
        >
          {props.menuItem.map((item, idx) => (
            <option key={idx}>{item}</option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default InputBox;
