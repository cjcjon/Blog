import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TagChip from "./TagChip";

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    "& * + *": {
      marginLeft: "4px",
    },
  },
  listResponsive: {
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    "& * + *": {
      marginLeft: "4px",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
      flexDirection: "column",
      overflowX: "initial",
      overflowY: "initial",
      whiteSpace: "initial",
      "& * + *": {
        margin: "0",
        marginTop: "4px",
      },
    },
  },
}));

function TagList({ responsive, tags }) {
  const classes = useStyles();

  return (
    <div className={clsx(responsive ? classes.listResponsive : classes.list)}>
      {tags.map((data) => (
        <TagChip
          key={data.text}
          href="/"
          text={data.text}
          number={data.number}
        />
      ))}
    </div>
  );
}

export default React.memo(TagList);
