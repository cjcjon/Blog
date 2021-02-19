import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  layoutRoot: {
    maxWidth: "800px",
    margin: "2rem auto 5rem auto",
  },
}));

function PostLayout({ children }) {
  const classes = useStyles();

  return <div className={classes.layoutRoot}>{children}</div>;
}

export default React.memo(PostLayout);
