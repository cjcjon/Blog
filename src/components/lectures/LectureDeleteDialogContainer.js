import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  changeLectureDialogField,
  deleteLecture,
  DELETE_LECTURE,
} from "@redux/sagas/LectureSaga";
import LoadingBackdrop from "@components/commons/LoadingBackdrop";
import LectureDeleteDialog from "./LectureDeleteDialog";

function LectureDeleteDialogContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { deleteDialog, error } = useSelector(({ lecture }) => ({
    deleteDialog: lecture.lectureDialog,
    error: lecture.error,
  }));
  const deleteLoading = useSelector(({ loading }) => loading[DELETE_LECTURE]);

  useEffect(() => {
    // 삭제 끝났으면 화면 다시 불러오기
    if (deleteLoading === false) {
      router.reload();
    }
  }, [dispatch, deleteLoading]);

  // Dialog 끄기
  const handleClose = useCallback(() => {
    dispatch(changeLectureDialogField({ key: "open", value: false }));
  }, [dispatch]);

  // 삭제 클릭
  const onSubmit = useCallback(() => {
    dispatch(deleteLecture(deleteDialog.id));
  }, [dispatch, deleteDialog.id]);

  return (
    <>
      <LectureDeleteDialog
        open={deleteDialog.open === "delete"}
        title="강의 삭제"
        desc="정말로 강의를 삭제하시겠습니까?"
        handleClose={handleClose}
        onSubmit={onSubmit}
        error={error}
      />
      <LoadingBackdrop open={deleteLoading} />
    </>
  );
}

export default LectureDeleteDialogContainer;
