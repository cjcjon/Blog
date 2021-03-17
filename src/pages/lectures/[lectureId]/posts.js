import React from "react";
import { END } from "redux-saga";
import Banner from "@components/Banner";
import PostEditButtonContainer from "@components/posts/write/PostEditButtonContainer";
import PostListContainer from "@components/posts/read/PostListContainer";
import Store from "@redux/Store";
import { setSSRCookies } from "@src/axios";
import { checkLogin } from "@redux/sagas/UserSaga";
import { fetchPosts } from "@redux/sagas/PostSaga";

function posts({ title }) {
  return (
    <>
      {/* 강의 제목 보여주는 배너 */}
      <Banner text={title} />

      {/* 포스트 생성 버튼 */}
      <PostEditButtonContainer />

      {/* 포스트 목록 */}
      <PostListContainer />
    </>
  );
}

export const getServerSideProps = Store.getServerSideProps(async (context) => {
  // 쿠키 설정
  setSSRCookies(context);

  // 로그인 정보 가져오기
  const cookie = context.req ? context.req.headers.cookie : "";
  const token = cookie
    ? cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")
    : null;
  if (token) {
    context.store.dispatch(checkLogin());
  }

  // 강의의 포스트들과 강의 정보 전부 불러오기
  const { lectureId } = context.params;
  context.store.dispatch(fetchPosts(lectureId));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  // check 에러 발생시 잘못된 토큰이므로 삭제 및 다시 로그인
  const state = context.store.getState();
  if (state.user.checkError) {
    context.res.setHeader("Set-Cookie", "access_token=deleted; Max-Age=-1");
    context.res.end();
  }

  // 강의 정보가 없을경우 404 반환
  if (!state.post.lectureInfo) {
    return { notFound: true };
  }

  return { props: { title: state.post.lectureInfo.title } };
});

export default posts;
