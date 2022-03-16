import * as React from "react";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Switch } from "@mui/material";

type TextAreaProps = {
  defaultValue: boolean;
};

type RhfTextAreaProps<T extends FieldValues> = TextAreaProps &
  UseControllerProps<T>;

const RhfSwitch = <T extends FieldValues>(props: RhfTextAreaProps<T>) => {
  const { field } = useController<T>(props);
  return <Switch {...field} checked={field.value} />;
};

export default RhfSwitch;
