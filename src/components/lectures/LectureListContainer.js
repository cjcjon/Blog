import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_LECTURES,
  changeLectureDialogField,
  initializeLectureDialog,
} from "@redux/sagas/LectureSaga";
import LectureList from "./LectureList";

function LectureListContainer() {
  const dispatch = useDispatch();
  const lectureList = useSelector(({ lecture }) => lecture.lectureList);
  const fetchLoading = useSelector(({ loading }) => loading[FETCH_LECTURES]);

  // Delete Dialog 열기
  const handleDeleteOpen = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(changeLectureDialogField({ key: "id", value: e.target.value }));
      dispatch(changeLectureDialogField({ key: "open", value: "delete" }));
    },
    [dispatch],
  );

  // Modify Dialog 열기
  const handleModifyOpen = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(initializeLectureDialog());
      dispatch(changeLectureDialogField({ key: "id", value: e.target.value }));
      dispatch(changeLectureDialogField({ key: "open", value: "modify" }));
    },
    [dispatch],
  );

  return (
    <LectureList
      loading={fetchLoading}
      lectureList={lectureList}
      onDeleteClick={handleDeleteOpen}
      onModifyClick={handleModifyOpen}
    />
  );
}

export default React.memo(LectureListContainer);
