import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

function PostViewerActionButtons({ onEdit }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button className={clsx(classes.button, classes.modify)} onClick={onEdit}>
        수정
      </Button>
      <Button className={clsx(classes.button, classes.delete)}>삭제</Button>
    </div>
  );
}

export default React.memo(PostViewerActionButtons);
