import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import RecommandSeriesTitle from "./RecommandSeriesTitle";
import RecommandSeriesList from "./RecommandSeriesList";

function RecommandSeriesContainer() {
  const recommandSeries = useSelector(({ main }) => main.recommandSeries);
  const columnBoxStyle = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyle.fullBox}>
      <RecommandSeriesTitle title="추천 시리즈" subTitle="Recommand" />
      <RecommandSeriesList recommandSeries={recommandSeries} />
    </Box>
  );
}

export default React.memo(RecommandSeriesContainer);
