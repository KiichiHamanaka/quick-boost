import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import React from "react";

type Props = {
  labelName: string;
  menuItem: Array<string>;
};

const InputBox = (props: Props) => {
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
