import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { TextField, TextFieldProps } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import React from "react";

type DateTimeProps = {
  error?: string;
  className?: string;
  label: string;
};

type RhfDateTimeProps<T extends FieldValues> = DateTimeProps &
  UseControllerProps<T>;

const RhfDatePicker = <T extends FieldValues>(props: RhfDateTimeProps<T>) => {
  const { field } = useController(props);
  console.log(field.value);
  return (
    <div>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DateTimePicker
          {...field}
          renderInput={(params: JSX.IntrinsicAttributes) => (
            <TextField {...params} label={props.label} />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default RhfDatePicker;
