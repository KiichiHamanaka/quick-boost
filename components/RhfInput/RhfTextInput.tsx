import * as React from "react";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { TextField } from "@mui/material";

type TextAreaProps = {
  placeholder?: string;
};

type RhfTextAreaProps<T extends FieldValues> = TextAreaProps &
  UseControllerProps<T>;

const RhfTextInput = <T extends FieldValues>(props: RhfTextAreaProps<T>) => {
  const { field } = useController<T>(props);
  return <TextField {...field} />;
};

export default RhfTextInput;
