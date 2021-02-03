import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import RecentTitle from "./RecentTitle";
import RecentPost from "./RecentPost";

const useStyles = makeStyles(() => ({
  root: {
    padding: "0 8px",
  },
}));

function RecentPanel() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <RecentTitle />
      <RecentPost />
    </Box>
  );
}

export default React.memo(RecentPanel);
