import React from "react";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  rootBase: {
    position: "relative",
    width: "100%",
    height: "210px",
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    color: theme.palette.common.black,
    [theme.breakpoints.up("sm")]: {
      height: "240px",
    },
  },
  blurBox: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, .3)",
    zIndex: "1",
  },
  textBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    wordBreak: "keep-all",
    textAlign: "center",
    zIndex: "2",
  },
  whiteText: {
    color: theme.palette.common.white,
  },
  titleText: {
    color: theme.palette.grey[600],
    fontWeight: "bold",
    fontSize: "3rem",
  },
}));

function Banner({ imageUrl, text }) {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <Paper
      elevation={text && imageUrl ? 1 : 0}
      className={clsx(
        classes.rootBase,
        imageUrl ? classes.whiteText : classes.titleText,
      )}
      style={
        // TODO: imageUrl로 불러오게 만들기
        imageUrl
          ? { backgroundImage: "url(https://source.unsplash.com/random)" }
          : {}
      }
    >
      {imageUrl && <Box className={classes.blurBox} />}
      {text && (
        <Box
          className={clsx(
            classes.textBox,
            wordStyles.noWordBreak,
            wordStyles.noLineBreak,
          )}
        >
          {imageUrl ? (
            <Typography variant="h4">{text}</Typography>
          ) : (
            <span>{text}</span>
          )}
        </Box>
      )}
    </Paper>
  );
}

export default React.memo(Banner);
