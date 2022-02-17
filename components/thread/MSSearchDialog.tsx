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
import useSelectMSBox from "../../hooks/useSelectMSBox";

type Props = {
  open: boolean;
  setOpen: (bool: boolean) => void;
};

const MSSearchDialog = (props: Props) => {
  const { dispatch } = useSelectMSBox();
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
          <SelectMobileSuits />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => props.setOpen(false)}>
          決定
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch({ type: "useMS", useMS: "reset" });
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
