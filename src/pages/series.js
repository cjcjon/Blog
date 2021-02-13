import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "@components/Banner";
import SeriesWriteDialogContainer from "@src/components/series/SeriesWriteDialogContainer";
import SeriesDeleteDialogContainer from "@components/series/SeriesDeleteDialogContainer";
import SeriesModifyDialogContainer from "@components/series/SeriesModifyDialogContainer";
import SeriesListContainer from "@components/series/SeriesListContainer";
import { fetchSeries } from "@redux/sagas/SeriesSaga";

function series() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 시리즈 데이터 불러오기
    dispatch(fetchSeries());
  }, []);

  return (
    <>
      {/* 그림 배너 */}
      <Banner text="시리즈" />

      {/* 시리즈 생성 다이얼로그 */}
      <SeriesWriteDialogContainer />

      {/* 시리즈 삭제 다이얼로그 */}
      <SeriesDeleteDialogContainer />

      {/* 시리즈 수정 다이얼로그 */}
      <SeriesModifyDialogContainer />

      {/* 시리즈 */}
      <SeriesListContainer />
    </>
  );
}

export default React.memo(series);
