import * as React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

type Props = {
  control: any;
  name: string;
  placeholder: string;
};

const HookFormInput = (props: Props) => {
  const { field } = useController(props);
  return <TextField {...field} placeholder={props.placeholder} />;
};

export default HookFormInput;
