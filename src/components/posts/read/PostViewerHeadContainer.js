import React from "react";
import { useSelector } from "react-redux";
import PostViewerHead from "./PostViewerHead";

function PostViewerHeadContainer() {
  const { postInfo } = useSelector(({ post }) => ({
    postInfo: post.postInfo,
  }));

  return <>{postInfo && <PostViewerHead post={postInfo} />}</>;
}

export default React.memo(PostViewerHeadContainer);
