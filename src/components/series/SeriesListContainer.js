import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_SERIES,
  changeSeriesDialogField,
  initializeSeriesDialog,
} from "@redux/sagas/SeriesSaga";
import SeriesList from "./SeriesList";

function SeriesListContainer() {
  const dispatch = useDispatch();
  const seriesList = useSelector(({ series }) => series.seriesList);
  const fetchLoading = useSelector(({ loading }) => loading[FETCH_SERIES]);

  // Delete Dialog 열기
  const handleDeleteOpen = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(changeSeriesDialogField({ key: "id", value: e.target.value }));
      dispatch(changeSeriesDialogField({ key: "open", value: "delete" }));
    },
    [dispatch],
  );

  // Modify Dialog 열기
  const handleModifyOpen = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(initializeSeriesDialog());
      dispatch(changeSeriesDialogField({ key: "id", value: e.target.value }));
      dispatch(changeSeriesDialogField({ key: "open", value: "modify" }));
    },
    [dispatch],
  );

  return (
    <SeriesList
      loading={fetchLoading}
      seriesList={seriesList}
      onDeleteClick={handleDeleteOpen}
      onModifyClick={handleModifyOpen}
    />
  );
}

export default SeriesListContainer;
