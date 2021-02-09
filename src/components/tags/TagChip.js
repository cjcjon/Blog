import React from "react";
import Link from "next/link";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  chip: {
    margin: "4px",
    maxWidth: "100%",
    minWidth: "58px",
  },
}));

function TagChip({ href, text, number }) {
  const classes = useStyles();

  return (
    <Link href={href}>
      <Chip
        label={number ? `${text} (${number})` : `${text}`}
        className={classes.chip}
        component="button"
        clickable
      />
    </Link>
  );
}

export default React.memo(TagChip);
