import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useErrorStyles } from "@styles/useful.styles";

function PostViewerDeleteDialog({ open, onConfirm, onCancel, error }) {
  const errorStyles = useErrorStyles();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="postDeleteDialogTitle"
      aria-describedby="postDeleteDialogDescription"
    >
      <DialogTitle id="postDeleteDialogTitle">포스트 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText id="postDeleteDialogDescription">
          포스트를 정말 삭제하시겠습니까?
        </DialogContentText>
        {error && <div className={errorStyles.defaultError}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          취소
        </Button>
        <Button onClick={onConfirm} color="primary">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(PostViewerDeleteDialog);
