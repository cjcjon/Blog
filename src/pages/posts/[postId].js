import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import Divider from "@material-ui/core/Divider";
import PostLayout from "@components/layout/PostLayout";
import PostViewerHeadContainer from "@components/posts/read/PostViewerHeadContainer";
import PostViewerContentContainer from "@components/posts/read/PostViewerContentContainer";
import PostViewerTOCContainer from "@components/posts/read/PostViewerTOCContainer";
import Store from "@redux/Store";
import { setSSRCookies } from "@src/axios";
import { checkLogin } from "@redux/sagas/UserSaga";
import { readPost } from "@redux/sagas/PostSaga";

function PostViewer() {
  const error = useSelector(({ post }) => post.error);

  // 에러 발생시
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PostLayout>
      <PostViewerHeadContainer />
      <Divider />
      <PostViewerContentContainer />
      <Divider />
      <PostViewerTOCContainer />
    </PostLayout>
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

  // 포스트 정보 불러오기
  const { postId } = context.params;
  context.store.dispatch(readPost(postId));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  // check 에러 발생시 잘못된 토큰이므로 삭제 및 다시 로그인
  const state = context.store.getState();
  if (state.user.checkError) {
    context.res.setHeader("Set-Cookie", "access_token=deleted; Max-Age=-1");
    context.res.end();
  }

  // 포스트 없으면 404
  if (state.post.error && state.post.error.status === 404) {
    return { notFound: true };
  }

  return {};
});

export default PostViewer;
