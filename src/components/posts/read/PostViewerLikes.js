import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "3rem 1rem 2rem 1rem",
  },
  hidden: {
    display: "hidden",
  },
}));

function PostViewerLikes({ number, onClick, errorMsg }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h6" style={{ marginRight: "1rem" }}>
          <b>포스트가 유용하셨나요?</b>
        </Typography>
        <IconButton
          aria-label="likes"
          color="primary"
          onClick={onClick}
          style={{ marginRight: "0.25rem", border: "1px solid #dfdfdf" }}
        >
          <ThumbUpIcon />
        </IconButton>
        <Typography variant="body1" style={{ marginLeft: "0.5rem" }}>
          {number}
        </Typography>
        {errorMsg && (
          <Alert
            severity="warning"
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            {errorMsg}
          </Alert>
        )}
      </div>
    </>
  );
}

export default React.memo(PostViewerLikes);
