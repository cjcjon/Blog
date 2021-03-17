import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useErrorStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  validationInput: {
    "& input:valid + fieldset": {
      borderColor: theme.palette.success.main,
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: theme.palette.error.main,
      borderWidth: 2,
    },
    "& .MuiOutlinedInput-root:hover fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

function LectureFormDialog({
  update,
  open,
  dialogTitle,
  desc,
  lectureDialog,
  handleClose,
  handleChange,
  handleFileChange,
  onSubmit,
  error,
}) {
  const classes = useStyles();
  const errorStyles = useErrorStyles();

  return (
    <div>
      <Dialog open={open} aria-labelledby="lectureWriteDialogTitle">
        <DialogTitle id="lectureWriteDialogTitle">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{desc}</DialogContentText>
          <form autoComplete="off">
            <TextField
              required={!update}
              name="title"
              label="title"
              placeholder="제목"
              value={lectureDialog.title}
              onChange={handleChange}
              variant="outlined"
              className={update ? null : classes.validationInput}
            />
            <input
              required={!update}
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              style={{ display: "none" }}
              id="thumbnailFile"
              name="thumbnailFile"
              label="thumbnailFile"
              onChange={handleFileChange}
            />
            <Tooltip title="Select Image">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="thumbnailFile">
                <IconButton
                  color="primary"
                  aria-label="upload thumbnail image"
                  component="span"
                >
                  <PhotoCamera fontSize="large" />
                </IconButton>
              </label>
            </Tooltip>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              {lectureDialog.thumbnailFile
                ? lectureDialog.thumbnailFile.name
                : "Select thumbnail image"}
            </label>
            {lectureDialog.previewURL && (
              <img
                src={lectureDialog.previewURL}
                width={528}
                alt="Preview not loaded"
              />
            )}
            {lectureDialog.inputError && (
              <div className={errorStyles.defaultError}>
                {lectureDialog.inputError}
              </div>
            )}
            {error && <div className={errorStyles.defaultError}>{error}</div>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={onSubmit} color="primary">
            전송
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(LectureFormDialog);
