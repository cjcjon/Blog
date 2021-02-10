import React from "react";
import { useSelector } from "react-redux";
import { FETCH_SERIES } from "@redux/sagas/SeriesSaga";
import SeriesList from "./SeriesList";

function SeriesListContainer() {
  const seriesList = useSelector(({ series }) => series.seriesList);
  const fetchLoading = useSelector(({ loading }) => loading[FETCH_SERIES]);

  return <SeriesList loading={fetchLoading} seriesList={seriesList} />;
}

export default SeriesListContainer;
