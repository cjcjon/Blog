import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CommentIcon from "@material-ui/icons/Comment";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "12px",
  },
  title: {
    fontSize: "1.75rem",
  },
}));

function RecentCommentTitle() {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <Box display="flex" className={clsx(classes.root, wordStyles.noWordBreak)}>
      <Typography
        variant="h5"
        className={clsx(classes.title, wordStyles.noLineBreak)}
      >
        <CommentIcon />
        &nbsp;
        <b>최신 댓글</b>
      </Typography>
    </Box>
  );
}

export default React.memo(RecentCommentTitle);
