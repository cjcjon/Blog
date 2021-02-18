import React from "react";
import { END } from "redux-saga";
import Store from "@redux/Store";
import Banner from "@components/Banner";
import PostEditButtonContainer from "@components/posts/write/PostEditButtonContainer";
import PostListContainer from "@components/posts/read/PostListContainer";
import { fetchPosts } from "@redux/sagas/PostSaga";

function posts({ title }) {
  return (
    <>
      {/* 시리즈 제목 보여주는 배너 */}
      <Banner text={title} />

      {/* 포스트 생성 버튼 */}
      <PostEditButtonContainer />

      {/* 포스트 목록 */}
      <PostListContainer />
    </>
  );
}

export const getServerSideProps = Store.getServerSideProps(
  async ({ store, params }) => {
    const { seriesId } = params;

    // 시리즈의 포스트들과 시리즈 정보 전부 불러오기
    store.dispatch(fetchPosts(seriesId));
    store.dispatch(END);
    await store.sagaTask.toPromise();

    // 시리즈 정보가 없을경우 404 반환
    const state = store.getState();
    if (!state.post.seriesInfo) {
      return { notFound: true };
    }

    return { props: { title: state.post.seriesInfo.title } };
  },
);

export default React.memo(posts);
