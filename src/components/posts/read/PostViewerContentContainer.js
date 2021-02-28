import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "@redux/sagas/PostSaga";
import PostViewerContent from "./PostViewerContent";

function PostViewerContentContainer() {
  const dispatch = useDispatch();
  const { lectureInfo, postList, postInfo, likeErrorMsg } = useSelector(
    ({ post }) => ({
      lectureInfo: post.lectureInfo,
      postList: post.postList,
      postInfo: post.postInfo,
      likeErrorMsg: post.likeFailureMsg,
    }),
  );

  // 좋아요 버튼 누를때 호출
  const onClickLike = useCallback(() => {
    dispatch(likePost(postInfo.id));
  }, [postInfo, dispatch]);

  return (
    <>
      {lectureInfo && postList && postInfo && (
        <PostViewerContent
          lectureInfo={lectureInfo}
          postList={postList}
          postInfo={postInfo}
          likeErrorMsg={likeErrorMsg}
          onClickLike={onClickLike}
        />
      )}
    </>
  );
}

export default PostViewerContentContainer;
