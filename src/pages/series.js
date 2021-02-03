import React from "react";
import Banner from "@src/components/Banner";
import SeriesList from "@src/components/series/SeriesList";

function series() {
  return (
    <>
      {/* 그림 배너 */}
      <Banner text="시리즈" />

      {/* 연재 시리즈 */}
      <SeriesList />
    </>
  );
}

export default React.memo(series);
