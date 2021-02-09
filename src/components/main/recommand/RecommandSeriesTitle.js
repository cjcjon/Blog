import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useWordStyles } from "../../../../styles/useful.styles";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "12px",
  },
  korean: {
    fontSize: "1.75rem",
    marginRight: "16px",
  },
  english: {
    overflow: "hidden",
    "&:first-letter": {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
  },
}));

function RecommandSeriesTitle({ title, subTitle }) {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <Box display="flex" className={clsx(classes.root, wordStyles.noWordBreak)}>
      <Typography
        variant="h5"
        className={clsx(classes.korean, wordStyles.noLineBreak)}
      >
        <ThumbUpIcon />
        &nbsp;
        <b>{title}</b>
      </Typography>
      <Typography variant="body1" className={classes.english}>
        {subTitle}
      </Typography>
    </Box>
  );
}

export default React.memo(RecommandSeriesTitle);
