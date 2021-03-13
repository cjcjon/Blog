import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_POST, likePost, deletePost } from "@redux/sagas/PostSaga";
import { setOriginalPost } from "@redux/sagas/WritePostSaga";
import PostViewerContent from "./PostViewerContent";
import PostViewerActionButtons from "./PostViewerActionButtons";
import PostViewerLikes from "./PostViewerLikes";
import PostViewerAccordion from "./PostViewerAccordion";

function PostViewerContentContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    lectureInfo,
    postList,
    postInfo,
    nextLink,
    likeErrorMsg,
    deleteErrorMsg,
  } = useSelector(({ post }) => ({
    lectureInfo: post.lectureInfo,
    postList: post.postList,
    postInfo: post.postInfo,
    nextLink: post.nextLink,
    likeErrorMsg: post.likeFailureMsg,
    deleteErrorMsg: post.deleteFailureMsg,
  }));
  const deleteLoading = useSelector(({ loading }) => loading[DELETE_POST]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // 새로운 링크를 받아왔으면 링크로 이동
    if (nextLink && nextLink.href !== "") {
      router.replace(nextLink.href);
    }
  }, [dispatch, nextLink]);

  // 좋아요 버튼 누를때 호출
  const onClickLike = useCallback(() => {
    dispatch(likePost(postInfo.id));
  }, [postInfo, dispatch]);

  // 포스트 수정 버튼 누를때 호출
  const onEdit = useCallback(() => {
    dispatch(setOriginalPost(postInfo));
    router.push(`/posts/write?lectureId=${postInfo.lectureId}`);
  }, [postInfo]);

  // 포스트 삭제
  const onDelete = useCallback(() => {
    dispatch(deletePost(postInfo.id));
  }, [postInfo]);

  return (
    <>
      {lectureInfo && postList && postInfo && (
        <PostViewerContent
          postInfo={postInfo}
          actionButtons={
            user && user.auth === 1 ? (
              // eslint-disable-next-line react/jsx-wrap-multilines
              <PostViewerActionButtons
                onEdit={onEdit}
                onDelete={onDelete}
                loading={deleteLoading}
                deleteError={deleteErrorMsg}
              />
            ) : null
          }
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
