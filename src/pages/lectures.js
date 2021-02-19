import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "@components/Banner";
import LectureWriteDialogContainer from "@src/components/lectures/LectureWriteDialogContainer";
import LectureDeleteDialogContainer from "@src/components/lectures/LectureDeleteDialogContainer";
import LectureModifyDialogContainer from "@src/components/lectures/LectureModifyDialogContainer";
import LectureListContainer from "@src/components/lectures/LectureListContainer";
import { fetchLectures } from "@redux/sagas/LectureSaga";

function lectures() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("강의 데이터 불러오기");

    // 강의 데이터 불러오기
    dispatch(fetchLectures());
  }, []);

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

export default React.memo(lectures);
