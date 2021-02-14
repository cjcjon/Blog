import React from "react";
import { useSelector } from "react-redux";
import PostList from "./PostList";

// posts: { id, title, body, likes, view, tags, makeDate, seriesId }
function PostListContainer() {
  const { postList, seriesInfo } = useSelector(({ post }) => ({
    postList: post.postList,
    seriesInfo: post.seriesInfo,
  }));

  return <PostList seriesInfo={seriesInfo} postList={postList} />;
}

export default React.memo(PostListContainer);
