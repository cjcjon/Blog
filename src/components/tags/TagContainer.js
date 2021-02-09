import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import { useWordStyles } from "@styles/useful.styles";
import TagList from "./TagList";

const useStyles = makeStyles(() => ({
  root: {
    padding: "0 8px",
  },
}));

function TagContainer() {
  const tagGroups = useSelector(({ main }) => main.tagGroups);
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" gutterBottom className={wordStyles.bold}>
        태그 목록
      </Typography>
      <Hidden only="xs">
        <Divider />
      </Hidden>
      <TagList responsive tags={tagGroups} />
    </Box>
  );
}

export default React.memo(TagContainer);
