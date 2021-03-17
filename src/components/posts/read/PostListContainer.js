import React from "react";
import { useSelector } from "react-redux";
import PostList from "./PostList";

function PostListContainer() {
  const { postList, lectureInfo } = useSelector(({ post }) => ({
    postList: post.postList,
    lectureInfo: post.lectureInfo,
  }));

  return <PostList lectureInfo={lectureInfo} postList={postList} />;
}

export default PostListContainer;
