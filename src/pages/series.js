import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "@src/components/Banner";
import SeriesFormDialogContainer from "@src/components/series/SeriesFormDialogContainer";
import SeriesListContainer from "@src/components/series/SeriesListContainer";
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
      <SeriesFormDialogContainer />

      {/* 시리즈 */}
      <SeriesListContainer />
    </>
  );
}

export default React.memo(series);
