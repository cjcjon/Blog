import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import Store from "@redux/Store";
import Divider from "@material-ui/core/Divider";
import PostLayout from "@components/layout/PostLayout";
import PostViewerHeadContainer from "@components/posts/read/PostViewerHeadContainer";
import PostViewerContentContainer from "@components/posts/read/PostViewerContentContainer";
import PostViewerTOCContainer from "@components/posts/read/PostViewerTOCContainer";
import { initialize, readPost } from "@redux/sagas/PostSaga";
import { setSSRCookies } from "@src/axios";

function PostViewer() {
  const dispatch = useDispatch();
  const error = useSelector(({ post }) => post.error);

  // 에러 발생시
  if (error) {
    return (
      <>
        {error.status ? (
          <div>
            {error.status}
            <br />
            {error.message}
          </div>
        ) : (
          <div>에러가 발생했습니다</div>
        )}
      </>
    );
  }

  useEffect(() => {
    return () => {
      // 나갈때 포스트 관련 정보 전부 지우기
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <>
      <PostLayout>
        <PostViewerHeadContainer />
        <Divider />
        <PostViewerContentContainer />
        <Divider />
        <PostViewerTOCContainer />
      </PostLayout>
    </>
  );
}

export const getServerSideProps = Store.getServerSideProps(async (context) => {
  const { postId } = context.params;

  // 쿠키 설정
  setSSRCookies(context);

  // 포스트 정보 불러오기
  context.store.dispatch(readPost(postId));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  const state = context.store.getState();
  if (state.post.error && state.post.error.status === 404) {
    return { notFound: true };
  }

  return {};
});

export default React.memo(PostViewer);
