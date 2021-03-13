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

function write({ modify }) {
  const router = useRouter();

  return (
    <PostLayout>
      <QuillEditorContainer modify={modify} />
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
  // 수정일경우
  if (context.query.postId) {
    context.store.dispatch(loadOriginalPost(context.query.postId));
    modify = true;
  }

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  // 유저 정보 없거나 권한 없으면 잘못된 상태임
  const state = context.store.getState();
  if (!state.user.user || state.user.user.auth !== 1) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: { modify } };
});

export default write;
