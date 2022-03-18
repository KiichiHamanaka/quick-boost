import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import ThreadFilterInputs from "../thread/ThreadFilterInputs";
import React, { Dispatch } from "react";
import { ThreadAction } from "../../reducers/thread";

type Props = {
  threadDispatch: Dispatch<ThreadAction>;
  setIsShowMSBOX: (bool: boolean) => void;
  setIsShowPartnerMSBOX: (bool: boolean) => void;
  setIsShowDateSearchDialog: (bool: boolean) => void;
  open: boolean;
  setOpen: (bool: boolean) => void;
};

const ThreadsFilterDialog: React.FC<Props> = ({
  threadDispatch,
  setIsShowMSBOX,
  setIsShowPartnerMSBOX,
  setIsShowDateSearchDialog,
  open,
  setOpen,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="scroll-dialog-title">スレッド検索フィルタ</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <ThreadFilterInputs
            threadDispatch={threadDispatch}
            setIsShowMSBOX={setIsShowMSBOX}
            setIsShowDateSearchDialog={setIsShowDateSearchDialog}
            setIsShowPartnerMSBOX={setIsShowPartnerMSBOX}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ThreadsFilterDialog;
