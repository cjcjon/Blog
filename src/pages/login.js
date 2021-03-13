import React from "react";
import LoginFormContainer from "@components/login/LoginFormContainer";
import Store from "@redux/Store";

function login() {
  return <LoginFormContainer />;
}

export const getServerSideProps = Store.getServerSideProps(async (context) => {
  // 로그인 상태 확인
  const cookie = context.req ? context.req.headers.cookie : "";
  const token = cookie
    ? cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")
    : null;
  if (token) {
    // 로그인 했으면 메인 페이지로 강제 반환
    return { redirect: { destination: "/", permanent: false } };
  }

  return {};
});

export default login;
