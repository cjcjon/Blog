import React from "react";
import { useSelector } from "react-redux";
import PostViewerHead from "./PostViewerHead";

function PostViewerHeadContainer() {
  const { postList, seriesInfo, postInfo } = useSelector(({ post }) => ({
    postList: post.postList,
    seriesInfo: post.seriesInfo,
    postInfo: post.postInfo,
  }));

  return (
    <>
      {postList && seriesInfo && postInfo && (
        <PostViewerHead
          post={postInfo}
          postList={postList}
          seriesInfo={seriesInfo}
        />
      )}
    </>
  );
}

export default React.memo(PostViewerHeadContainer);
