import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (bool: boolean) => void;
  title: string;
  text: string;
  event: any;
};

const AlertDialog = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      fullWidth
      maxWidth="sm"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {props.text}
          </DialogContentText>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            props.event();
            props.setOpen(false);
          }}
        >
          はい
        </Button>
        <Button variant="outlined" onClick={() => props.setOpen(false)}>
          いいえ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
