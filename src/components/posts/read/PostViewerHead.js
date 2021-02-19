import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headRoot: {
    marginBottom: "1rem",
  },
  headTitle: {
    fontSize: "3rem",
    margin: "0",
    marginBottom: "1.5rem",
  },
  meta: {
    padding: "0 8px",
    color: theme.palette.grey[600],
  },
}));

function PostViewerHead({ post }) {
  const classes = useStyles();

  return (
    <div className={classes.headRoot}>
      <h1 className={classes.headTitle}>{post.title}</h1>
      <div className={classes.meta}>
        <div style={{ marginBottom: "0.6rem" }}>{post.makeDate}</div>
        <span style={{ margin: "0 0.375rem" }}>•</span>조회수: {post.view}회
        <span style={{ margin: "0 0.375rem" }}>•</span>좋아요: {post.likes}
      </div>
    </div>
  );
}

export default React.memo(PostViewerHead);
