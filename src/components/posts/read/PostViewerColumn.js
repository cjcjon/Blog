import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import LinkWrapper from "@components/links/LinkWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0 1rem",
    height: "4.25rem",
    backgroundColor: theme.palette.grey[300],
  },
  textGrid: {
    flex: "1 1 0",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
  },
  flexLeftAlign: {
    alignItems: "flex-start",
  },
  flexRightAlign: {
    alignItems: "flex-end",
  },
  iconGrid: {
    display: "flex",
    width: "32px",
    height: "32px",
    borderRadius: "16px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.success.main,
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.success.main,
  },
  leftMargin: {
    marginLeft: "1rem",
  },
  rightMargin: {
    marginRight: "1rem",
  },
}));

function PostViewerColumn({ href, title, isNext }) {
  const classes = useStyles();

  return (
    <LinkWrapper href={href}>
      <Paper elevation={1} className={classes.root}>
        {!isNext && (
          <div className={clsx(classes.iconGrid, classes.rightMargin)}>
            <SkipPreviousRoundedIcon />
          </div>
        )}
        <div
          className={clsx(
            classes.textGrid,
            isNext ? classes.flexRightAlign : classes.flexLeftAlign,
          )}
        >
          <Typography variant="caption">
            {isNext ? "다음 포스트" : "이전 포스트"}
          </Typography>
          <Typography variant="subtitle1">
            <b>{title}</b>
          </Typography>
        </div>
        {isNext && (
          <div className={clsx(classes.iconGrid, classes.leftMargin)}>
            <SkipNextRoundedIcon />
          </div>
        )}
      </Paper>
    </LinkWrapper>
  );
}

export default React.memo(PostViewerColumn);
