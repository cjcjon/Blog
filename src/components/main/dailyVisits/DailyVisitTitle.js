import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "8px",
    textAlign: "center",
  },
  title: {
    color: theme.palette.grey[500],
  },
}));

function DailyVisitTitle() {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <Box className={clsx(classes.root, wordStyles.noWordBreak)}>
      <Typography
        variant="subtitle1"
        className={clsx(classes.title, wordStyles.noLineBreak)}
      >
        <b>일일 방문자</b>
      </Typography>
    </Box>
  );
}

export default React.memo(DailyVisitTitle);
