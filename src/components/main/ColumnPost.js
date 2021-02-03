import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import LinkWrapper from "@components/links/LinkWrapper";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  titleText: {
    flexGrow: 6,
    fontSize: "0.925rem",
    marginRight: theme.spacing(3),
  },
  subText: {
    flexGrow: 1,
    fontSize: "0.75rem",
    textAlign: "right",
    whiteSpace: "nowrap",
  },
  colored: {
    color: theme.palette.primary.main,
  },
  bold: {
    fontWeight: "bold",
  },
}));

function ColumnPost({ href, title, subText, subIsDate = true }) {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <LinkWrapper href={href}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        className={classes.root}
      >
        <Box
          className={clsx(
            classes.titleText,
            wordStyles.dottedLine,
            classes.colored,
          )}
        >
          {title}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          className={clsx(classes.subText, { [classes.bold]: !subIsDate })}
        >
          {subText}
        </Box>
      </Box>
    </LinkWrapper>
  );
}

export default React.memo(ColumnPost);
