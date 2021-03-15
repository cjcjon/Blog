import React from "react";
import { useRouter } from "next/router";
import { END } from "redux-saga";
import PostLayout from "@components/layout/PostLayout";
import QuillEditorContainer from "@components/posts/write/QuillEditorContainer";
import TagWriterContainer from "@components/posts/write/TagWriterContainer";
import WritePostButtonsContainer from "@components/posts/write/WritePostButtonsContainer";
import Store from "@redux/Store";
import { setSSRCookies } from "@src/axios";
import { checkLogin } from "@redux/sagas/UserSaga";
import { loadOriginalPost } from "@redux/sagas/WritePostSaga";

function write({ originalPost }) {
  const router = useRouter();

  return (
    <PostLayout>
      <QuillEditorContainer originalPost={originalPost} />
      <TagWriterContainer />
      <WritePostButtonsContainer
        lectureId={router.query.lectureId}
        postId={router.query.postId}
      />
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

  let modify = false;
  let originalPost = null;
  // 수정일경우
  if (context.query.postId) {
    context.store.dispatch(loadOriginalPost(context.query.postId));
    modify = true;
  }

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  const state = context.store.getState();

  // check 에러 발생시 잘못된 토큰이므로 삭제
  if (context.store.getState().user.checkError) {
    context.res.setHeader("Set-Cookie", "access_token=deleted; Max-Age=-1");
    context.res.end();
    return {};
  }

  // 유저 정보 없거나 권한 없으면 잘못된 상태임
  if (!state.user.user || state.user.user.auth !== 1) {
    // 메인 페이지로 돌아가기
    return { redirect: { destination: "/", permanent: false } };
  }

  // 수정이면 원본 body 저장
  if (modify) {
    originalPost = state.writePost.body;
  }

  return { props: { originalPost } };
});

export default write;
