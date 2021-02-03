import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import LinkWrapper from "@components/links/LinkWrapper";

const useStyles = makeStyles(() => ({
  chip: {
    maxWidth: "100%",
    minWidth: "58px",
  },
}));

function TagChip({ href, text, number }) {
  const classes = useStyles();

  return (
    <LinkWrapper href={href}>
      <Chip
        label={number ? `${text} (${number})` : `${text}`}
        className={classes.chip}
        clickable
      />
    </LinkWrapper>
  );
}

export default React.memo(TagChip);
