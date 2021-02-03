import React from "react";
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

const tags = [
  { text: "전체보기", number: 19 },
  { text: "js", number: 15 },
  { text: "css", number: 3 },
  { text: "html", number: 1 },
  { text: "js2", number: 15 },
  { text: "c++", number: 3 },
  { text: "html2", number: 5 },
  { text: "css2", number: 1 },
  { text: "c#", number: 9 },
  { text: "react", number: 8 },
  { text: "vue", number: 2 },
];

function TagPanel() {
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
      <TagList responsive tags={tags} />
    </Box>
  );
}

export default React.memo(TagPanel);
