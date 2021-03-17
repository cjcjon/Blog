import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LoadingBackdrop from "@components/commons/LoadingBackdrop";
import PostViewerDeleteDialog from "./PostViewerDeleteDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "2rem",
    marginTop: "-1.5rem",
  },
  button: {
    "& + &": {
      marginLeft: "0.25rem",
    },
  },
  modify: {
    color: theme.palette.primary.main,
  },
  delete: {
    color: theme.palette.error.main,
  },
}));

function PostViewerActionButtons({ onEdit, onDelete, loading, deleteError }) {
  const classes = useStyles();
  const [deleteDialog, setDeleteDialog] = useState(false);

  const onDeleteClick = useCallback(() => {
    setDeleteDialog(true);
  }, []);

  const onCancelDelete = useCallback(() => {
    setDeleteDialog(false);
  }, []);

  return (
    <div className={classes.root}>
      <Button className={clsx(classes.button, classes.modify)} onClick={onEdit}>
        수정
      </Button>
      <Button
        className={clsx(classes.button, classes.delete)}
        onClick={onDeleteClick}
      >
        삭제
      </Button>
      <PostViewerDeleteDialog
        open={deleteDialog}
        onConfirm={onDelete}
        onCancel={onCancelDelete}
        error={deleteError}
      />
      <LoadingBackdrop open={loading} />
    </div>
  );
}

export default React.memo(PostViewerActionButtons);
