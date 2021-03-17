import React from "react";
import { useSelector } from "react-redux";
import PostViewerHead from "./PostViewerHead";

function PostViewerHeadContainer() {
  const postInfo = useSelector(({ post }) => post.postInfo);

  return <>{postInfo && <PostViewerHead post={postInfo} />}</>;
}

export default PostViewerHeadContainer;
