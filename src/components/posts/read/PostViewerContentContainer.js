import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "@redux/sagas/PostSaga";
import { setOriginalPost } from "@redux/sagas/WritePostSaga";
import PostViewerContent from "./PostViewerContent";
import PostViewerActionButtons from "./PostViewerActionButtons";
import PostViewerLikes from "./PostViewerLikes";
import PostViewerAccordion from "./PostViewerAccordion";

function PostViewerContentContainer() {
  const router = useRouter();
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

  // 포스트 수정 버튼 누를때 호출
  const onEdit = useCallback(() => {
    dispatch(setOriginalPost(postInfo));
    router.push(`/posts/write?lectureId=${postInfo.lectureId}`);
  }, [postInfo]);

  return (
    <>
      {lectureInfo && postList && postInfo && (
        <PostViewerContent
          postInfo={postInfo}
          actionButtons={<PostViewerActionButtons onEdit={onEdit} />}
          likes={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <PostViewerLikes
              number={postInfo.likes}
              onClick={onClickLike}
              errorMsg={likeErrorMsg}
            />
          }
          accordion={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <PostViewerAccordion
              lectureInfo={lectureInfo}
              postList={postList}
            />
          }
        />
      )}
    </>
  );
}

export default PostViewerContentContainer;
