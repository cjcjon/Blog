import React from "react";
import { END } from "redux-saga";
import SearchBarContainer from "@components/search/SearchBarContainer";
import SearchListContainer from "@components/search/SearchListContainer";
import Store from "@redux/Store";
import { setSSRCookies } from "@src/axios";
import { checkLogin } from "@redux/sagas/UserSaga";
import { changeField, searchPost } from "@redux/sagas/SearchSaga";

function search() {
  return (
    <>
      <SearchBarContainer />
      <SearchListContainer />
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

  if (context.query.searchKey && context.query.searchKey !== "") {
    context.store.dispatch(
      changeField({
        key: "searchName",
        value: context.query.searchKey,
      }),
    );
    context.store.dispatch(searchPost(context.query.searchKey));
  }

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  // check 에러 발생시 잘못된 토큰이므로 삭제 및 다시 로그인
  const state = context.store.getState();
  if (state.user.checkError) {
    context.res.setHeader("Set-Cookie", "access_token=deleted; Max-Age=-1");
    context.res.end();
  }
});

export default search;
