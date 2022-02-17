import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import SelectMobileSuits from "../SelectMobileSuits";
import { ThreadAction } from "../../reducers/thread";
import { MSBoxAction } from "../../reducers/selectMSBox";
import { Dispatch } from "react";

type Props = {
  open: boolean;
  setOpen: (bool: boolean) => void;
  threadDispatch: Dispatch<ThreadAction>;
  msDispatch: Dispatch<MSBoxAction>;
};

const MSSearchDialog = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="scroll-dialog-title">MS検索</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            使いたいMSを選択してください
          </DialogContentText>
          <SelectMobileSuits threadDispatch={props.threadDispatch} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => props.setOpen(false)}>
          決定
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            props.msDispatch({ type: "useMS", useMS: "reset" });
            props.setOpen(false);
          }}
        >
          リセット
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MSSearchDialog;
