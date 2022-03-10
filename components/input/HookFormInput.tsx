import * as React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { TextField } from "@mui/material";

const HookFormInput = (props: UseControllerProps<any>) => {
  const { field } = useController(props);
  return <TextField {...field} placeholder={props.name} />;
};

export default HookFormInput;
