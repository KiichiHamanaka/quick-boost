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
import { MSBoxAction } from "../../reducers/selectMSBox";
import { Dispatch } from "react";

type Props = {
  open: boolean;
  setOpen: (bool: boolean) => void;
  text?: string;
  whichOne: "self" | "partner";
  dispatch: Dispatch<MSBoxAction>;
};

const MSSearchDialog = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      fullWidth
      maxWidth="sm"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="scroll-dialog-title">MS検索</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            使いたいMSを選択してください
          </DialogContentText>
          <SelectMobileSuits whichOne={props.whichOne} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => props.setOpen(false)}>
          決定
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            props.dispatch({ type: "useMS", useMS: "reset" });
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
