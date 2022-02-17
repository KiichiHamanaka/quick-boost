import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

const MSDialog = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="scroll-dialog-title">
        探したいMSを選択してください
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <SelectMobileSuits threadDispatch={props.threadDispatch} />
        </DialogContentText>
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

export default MSDialog;
