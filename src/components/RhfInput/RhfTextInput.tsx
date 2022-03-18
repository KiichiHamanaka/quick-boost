import * as React from "react";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { TextField } from "@mui/material";

type TextAreaProps = {
  placeholder?: string;
  minRows?: number;
};

type RhfTextAreaProps<T extends FieldValues> = TextAreaProps &
  UseControllerProps<T>;

const RhfTextInput = <T extends FieldValues>(props: RhfTextAreaProps<T>) => {
  const { field } = useController<T>(props);
  return (
    <TextField
      {...field}
      placeholder={props.placeholder}
      minRows={props.minRows}
    />
  );
};

export default RhfTextInput;
