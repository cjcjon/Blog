import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import Store from "@redux/Store";
import Divider from "@material-ui/core/Divider";
import PostLayout from "@components/layout/PostLayout";
import PostViewerHeadContainer from "@components/posts/read/PostViewerHeadContainer";
import PostViewerContentContainer from "@components/posts/read/PostViewerContentContainer";
import PostViewerTOCContainer from "@components/posts/read/PostViewerTOCContainer";
import { readPost } from "@redux/sagas/PostSaga";

function PostViewer() {
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

export const getServerSideProps = Store.getServerSideProps(
  async ({ store, params }) => {
    const { postId } = params;

    // 포스트 정보 불러오기
    store.dispatch(readPost(postId));
    store.dispatch(END);
    await store.sagaTask.toPromise();

    const state = store.getState();
    if (state.post.error && state.post.error.status === 404) {
      return { notFound: true };
    }

    return {};
  },
);

export default React.memo(PostViewer);
