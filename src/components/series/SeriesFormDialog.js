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
  errorMessage: {
    color: theme.palette.error.main,
    textAlign: "center",
    fontSize: "0.875rem",
    marginTop: "1rem",
  },
}));

function SeriesFormDialog({
  open,
  title,
  thumbnailFile,
  previewURL,
  handleClose,
  handleChange,
  handleFileChange,
  onSubmit,
  inputError,
  error,
}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-series-dialog">
        <DialogTitle>Manage Series</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>제목</b>과 <b>이미지</b>을 넣어야 정상적인 등록이 가능합니다.
          </DialogContentText>
          <form autoComplete="off">
            <TextField
              required
              name="title"
              label="title"
              placeholder="제목"
              value={title}
              onChange={handleChange}
              variant="outlined"
              className={classes.validationInput}
            />
            <input
              required
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              style={{ display: "none" }}
              id="thumbnailFile"
              name="thumbnailFile"
              label="thumbnail-file"
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
              {thumbnailFile ? thumbnailFile.name : "Select thumbnail image"}
            </label>
            {previewURL && (
              <img src={previewURL} width={528} alt="Preview not loaded" />
            )}
            {inputError && (
              <div className={classes.errorMessage}>{inputError}</div>
            )}
            {error && (
              <div className={classes.errorMessage}>전송에 실패하였습니다</div>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={onSubmit} color="primary">
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(SeriesFormDialog);
