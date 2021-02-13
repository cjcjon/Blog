import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSeriesDialogField,
  deleteSeries,
  DELETE_SERIES,
} from "@redux/sagas/SeriesSaga";
import LoadingBackdrop from "@components/commons/LoadingBackdrop";
import SeriesDeleteDialog from "./SeriesDeleteDialog";

function SeriesDeleteDialogContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { deleteDialog, error } = useSelector(({ series }) => ({
    deleteDialog: series.seriesDialog,
    error: series.error,
  }));
  const deleteLoading = useSelector(({ loading }) => loading[DELETE_SERIES]);

  useEffect(() => {
    // 삭제 끝났으면 화면 다시 불러오기
    if (deleteLoading === false) {
      router.reload();
    }
  }, [dispatch, deleteLoading]);

  // Dialog 끄기
  const handleClose = useCallback(() => {
    dispatch(changeSeriesDialogField({ key: "open", value: false }));
  }, [dispatch]);

  // 삭제 클릭
  const onSubmit = useCallback(() => {
    dispatch(deleteSeries(deleteDialog.id));
  }, [dispatch, deleteDialog.id]);

  return (
    <>
      <SeriesDeleteDialog
        open={deleteDialog.open === "delete"}
        title="DELETE SERIES"
        desc="정말로 시리즈를 삭제하시겠습니까?"
        handleClose={handleClose}
        onSubmit={onSubmit}
        error={error}
      />
      <LoadingBackdrop open={deleteLoading} />
    </>
  );
}

export default React.memo(SeriesDeleteDialogContainer);
