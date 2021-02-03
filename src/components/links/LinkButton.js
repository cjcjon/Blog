import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  noHoverButton: {
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  // TODO: exact일 때랑 아닐때랑 구분해서 highlight
  highlighted: {
    color: theme.palette.primary.main,
  },
}));

function LinkButton({ href, text }) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Link href={href}>
      <Button
        disableElevation
        disableFocusRipple
        disableRipple
        size="large"
        className={clsx(classes.noHoverButton, {
          [classes.highlighted]: router.pathname === href,
        })}
      >
        {text}
      </Button>
    </Link>
  );
}

export default React.memo(LinkButton);
