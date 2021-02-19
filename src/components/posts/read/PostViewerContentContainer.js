import React from "react";
import { useSelector } from "react-redux";
import PostViewerContent from "./PostViewerContent";

function PostViewerContentContainer() {
  const { lectureInfo, postList, postInfo } = useSelector(({ post }) => ({
    lectureInfo: post.lectureInfo,
    postList: post.postList,
    postInfo: post.postInfo,
  }));

  return (
    <>
      {lectureInfo && postList && postInfo && (
        <PostViewerContent
          lectureInfo={lectureInfo}
          postList={postList}
          postInfo={postInfo}
        />
      )}
    </>
  );
}

export default PostViewerContentContainer;
