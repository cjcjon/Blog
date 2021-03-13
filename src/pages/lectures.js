import React from "react";
import { END } from "redux-saga";
import Banner from "@components/Banner";
import LectureWriteDialogContainer from "@components/lectures/LectureWriteDialogContainer";
import LectureDeleteDialogContainer from "@components/lectures/LectureDeleteDialogContainer";
import LectureModifyDialogContainer from "@components/lectures/LectureModifyDialogContainer";
import LectureListContainer from "@components/lectures/LectureListContainer";
import Store from "@redux/Store";
import { setSSRCookies } from "@src/axios";
import { checkLogin } from "@redux/sagas/UserSaga";
import { fetchLectures } from "@redux/sagas/LectureSaga";

function lectures() {
  return (
    <>
      {/* 그림 배너 */}
      <Banner text="LECTURES" />

      {/* 강의 생성 다이얼로그 */}
      <LectureWriteDialogContainer />

      {/* 강의 삭제 다이얼로그 */}
      <LectureDeleteDialogContainer />

      {/* 강의 수정 다이얼로그 */}
      <LectureModifyDialogContainer />

      {/* 강의 목록 */}
      <LectureListContainer />
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

  // 강의 데이터 불러오기
  context.store.dispatch(fetchLectures());

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default lectures;
