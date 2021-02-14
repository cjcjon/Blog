import React from "react";
import { END } from "redux-saga";
import Store from "@redux/Store";
import Banner from "@components/Banner";
import PostEditButtonContainer from "@components/posts/PostEditButtonContainer";
import PostListContainer from "@components/posts/PostListContainer";
import { fetchPosts } from "@redux/sagas/PostSaga";

function posts({ title }) {
  // getServerSideProps 같은 SSR 함수에서 dispatch 하고
  // redux에 저장된 Object의 내부 데이터를 참조할 시 에러 발생
  // 최대한 객체를 건네주는 쪽으로 만든다

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
    if (!store.getState().post.seriesInfo) {
      return { notFound: true };
    }

    return {
      props: { title: store.getState().post.seriesInfo.title },
    };
  },
);

export default React.memo(posts);
