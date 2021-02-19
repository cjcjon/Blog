import React from "react";
import { useSelector } from "react-redux";
import PostViewerContent from "./PostViewerContent";

function PostViewerContentContainer() {
  const { seriesInfo, postList, postInfo } = useSelector(({ post }) => ({
    seriesInfo: post.seriesInfo,
    postList: post.postList,
    postInfo: post.postInfo,
  }));

  return (
    <>
      {seriesInfo && postList && postInfo && (
        <PostViewerContent
          seriesInfo={seriesInfo}
          postList={postList}
          postInfo={postInfo}
        />
      )}
    </>
  );
}

export default PostViewerContentContainer;
