import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import RecommandPostTitle from "./RecommandPostTitle";
import RecommandPostList from "./RecommandPostList";

function RecommandPostsContainer() {
  const recommandPosts = useSelector(({ main }) => main.recommandPosts);
  const columnBoxStyle = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyle.fullBox}>
      <RecommandPostTitle title="추천 포스트" subTitle="Recommand" />
      <RecommandPostList recommandPosts={recommandPosts} />
    </Box>
  );
}

export default RecommandPostsContainer;
