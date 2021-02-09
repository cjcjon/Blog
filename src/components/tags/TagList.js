import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TagChip from "./TagChip";

const useStyles = makeStyles((theme) => ({
  list: {
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    "& * + *": {
      marginLeft: "4px",
    },
  },
  listResponsive: {
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    "& * + *": {
      marginLeft: "4px",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexWrap: "wrap",
      margin: "-4px",
      marginTop: theme.spacing(1),
      overflowX: "initial",
      overflowY: "initial",
      whiteSpace: "initial",
    },
  },
}));

function TagList({ responsive, tags }) {
  const classes = useStyles();

  return (
    <div className={clsx(responsive ? classes.listResponsive : classes.list)}>
      {tags.map((data) => (
        <TagChip key={data.tag} href="/" text={data.tag} number={data.count} />
      ))}
    </div>
  );
}

export default React.memo(TagList);
