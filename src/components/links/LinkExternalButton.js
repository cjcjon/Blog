import React from "react";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  noHoverButton: {
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      textDecoration: "none",
    },
  },
  black: {
    color: theme.palette.common.black,
  },
}));

function LinkExternalButton({ href, text, black = false }) {
  const classes = useStyles();

  return (
    <Link
      component={Button}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      disableElevation
      disableFocusRipple
      disableRipple
      size="large"
      className={clsx(classes.noHoverButton, {
        [classes.black]: black,
      })}
    >
      {text}
    </Link>
  );
}

export default React.memo(LinkExternalButton);
