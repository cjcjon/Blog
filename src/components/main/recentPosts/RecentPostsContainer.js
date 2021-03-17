import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import RecentPostTitle from "./RecentPostTitle";
import RecentPostList from "./RecentPostList";

const useStyles = makeStyles(() => ({
  root: {
    padding: "0 8px",
  },
}));

function RecentPostsContainer() {
  const recentPosts = useSelector(({ main }) => main.recentPosts);
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <RecentPostTitle title="최신 작성글" />
      <RecentPostList posts={recentPosts} />
    </Box>
  );
}

export default RecentPostsContainer;
