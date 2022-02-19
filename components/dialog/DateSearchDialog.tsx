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
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import { useThreads } from "../../hooks/swrHooks";

type Props = {
  open: boolean;
  setOpen: (bool: boolean) => void;
};

const DateSearchDialog = (props: Props) => {
  const { threadState, threadDispatch } = useThreads();

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

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2}>
              <DatePicker
                disableFuture
                label="開始日時"
                openTo="year"
                views={["year", "month", "day"]}
                value={threadState.startedAt}
                onChange={(newValue) => {
                  threadDispatch({ type: "startedAt", startedAt: newValue });
                }}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => <TextField {...params} />}
              />

              <DatePicker
                disableFuture
                label="終了日時"
                openTo="year"
                views={["year", "month", "day"]}
                value={threadState.finishedAt}
                onChange={(newValue) => {
                  threadDispatch({ type: "finishedAt", finishedAt: newValue });
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
            threadDispatch({ type: "startedAt", startedAt: "reset" });
            threadDispatch({ type: "finishedAt", finishedAt: "reset" });
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
