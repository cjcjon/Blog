import axios from "axios";

const configedAxios = axios.create();

// 프록시 설정
configedAxios.defaults.proxy = {
  host: "localhost",
  port: "4000",
};

/**
 * SSR getServerSideProps같은 함수 호출 시 쿠키가 없으므로 쿠키 넣어주는 함수
 */
export function setSSRCookies(context) {
  // 쿠키 가져오기
  const cookie = context.req ? context.req.headers.cookie : "";

  // 쿠키 중복 방지하기 위해 비우기
  configedAxios.defaults.headers.Cookie = "";

  // 서버일때와 쿠키 있을 때 cookie 넣어주기
  if (context.req && cookie) {
    configedAxios.defaults.headers.Cookie = cookie;
  }
}

export default configedAxios;
