import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useErrorStyles } from "@styles/useful.styles";

function LectureDeleteDialog({
  open,
  title,
  desc,
  handleClose,
  onSubmit,
  error,
}) {
  const errorStyles = useErrorStyles();

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="deleteDialogTitle"
      aria-describedby="deleteDialogDescription"
    >
      <DialogTitle id="deleteDialogTitle">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="deleteDialogDescription">
          {desc}
        </DialogContentText>
        {error && (
          <div className={errorStyles.defaultError}>전송에 실패하였습니다</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          취소
        </Button>
        <Button onClick={onSubmit} color="primary">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(LectureDeleteDialog);
