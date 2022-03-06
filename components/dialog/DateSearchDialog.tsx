import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { Dispatch } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { ThreadAction, ThreadState } from "../../reducers/thread";
import DateAdapter from "@mui/lab/AdapterDayjs";

type Props = {
  open: boolean;
  setOpen: (bool: boolean) => void;
  state: ThreadState;
  dispatch: Dispatch<ThreadAction>;
};

const DateSearchDialog = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="scroll-dialog-title">日付検索</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            遊びたい日付を入力してください
          </DialogContentText>

          <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={2}>
              <DateTimePicker
                label="開始日時"
                value={props.state.startedAt}
                onChange={(newValue) => {
                  props.dispatch({ type: "startedAt", startedAt: newValue });
                }}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => <TextField {...params} />}
              />

              <DateTimePicker
                label="終了日時"
                value={props.state.finishedAt}
                onChange={(newValue) => {
                  props.dispatch({ type: "finishedAt", finishedAt: newValue });
                }}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => props.setOpen(false)}>
          決定
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            props.dispatch({ type: "startedAt", startedAt: "reset" });
            props.dispatch({ type: "finishedAt", finishedAt: "reset" });
            props.setOpen(false);
          }}
        >
          リセット
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateSearchDialog;
