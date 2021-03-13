import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLectureDialogField,
  initializeLectureDialog,
} from "@redux/sagas/LectureSaga";
import LectureList from "./LectureList";

function LectureListContainer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const lectureList = useSelector(({ lecture }) => lecture.lectureList);

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
      hasAuth={user ? user.auth === 1 : false}
      lectureList={lectureList}
      onDeleteClick={handleDeleteOpen}
      onModifyClick={handleModifyOpen}
    />
  );
}

export default React.memo(LectureListContainer);
