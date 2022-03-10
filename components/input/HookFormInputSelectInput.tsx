import * as React from "react";
import { useController } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

type Props = {
  name: string;
  defaultValue: string;
  menuItem: Array<string>;
  control: any;
  helperText?: string;
};

const HookFormInputSelectInput = (props: Props) => {
  const { field } = useController({
    control: props.control,
    defaultValue: props.defaultValue,
    name: props.name,
  });

  return (
    <TextField select {...field} sx={{ minWidth: "200px" }}>
      {props.menuItem.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default HookFormInputSelectInput;
