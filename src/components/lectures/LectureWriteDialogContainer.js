import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  initializeLectureDialog,
  changeLectureDialogField,
  writeLecture,
  WRITE_LECTURE,
} from "@redux/sagas/LectureSaga";
import LoadingBackdrop from "@components/commons/LoadingBackdrop";
import LectureFormDialog from "./LectureFormDialog";

function LectureWriteDialogContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { writeDialog, nextLink, error } = useSelector(({ lecture }) => ({
    writeDialog: lecture.lectureDialog,
    nextLink: lecture.writeLink,
    error: lecture.error,
  }));
  const writeLoading = useSelector(({ loading }) => loading[WRITE_LECTURE]);

  useEffect(() => {
    // 새로운 링크를 받아왔으면 링크로 이동
    if (nextLink.href !== "") {
      if (router.pathname === nextLink.href) {
        router.reload();
      } else {
        router.push(nextLink.href);
      }
    }
  }, [dispatch, nextLink]);

  // Dialog 열기
  const handleOpen = useCallback(() => {
    dispatch(initializeLectureDialog());
    dispatch(changeLectureDialogField({ key: "open", value: "write" }));
  }, [dispatch]);

  // Dialog 끄기
  const handleClose = useCallback(() => {
    dispatch(changeLectureDialogField({ key: "open", value: false }));
  }, [dispatch]);

  // Dialog 이름으로 값 변경
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeLectureDialogField({ key: name, value }));
    },
    [dispatch],
  );

  // 파일변경 redux 저장 및 썸네일 표시
  const handleFileChange = useCallback(
    (e) => {
      e.preventDefault();
      const reader = new FileReader();
      const uploadedFile = e.target.files[0];

      // 파일 redux 저장
      dispatch(
        changeLectureDialogField({ key: "thumbnailFile", value: uploadedFile }),
      );

      // preview redux 저장
      reader.onloadend = () => {
        dispatch(
          changeLectureDialogField({ key: "previewURL", value: reader.result }),
        );
      };

      reader.readAsDataURL(uploadedFile);
    },
    [dispatch],
  );

  // 전송
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (writeDialog.title === "") {
        dispatch(
          changeLectureDialogField({
            key: "inputError",
            value: "제목을 입력하세요",
          }),
        );
        return;
      }

      if (writeDialog.thumbnailFile === null) {
        dispatch(
          changeLectureDialogField({
            key: "inputError",
            value: "썸네일 이미지를 등록하세요",
          }),
        );
        return;
      }

      // 폼 데이터 생성
      const formData = new FormData();
      formData.append("title", writeDialog.title);
      formData.append("thumbnailFile", writeDialog.thumbnailFile);

      // 전송
      dispatch(writeLecture(formData));
    },
    [dispatch, writeDialog.title, writeDialog.thumbnailFile],
  );

  return (
    <div style={{ marginBottom: "8px" }}>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        강의 추가
      </Button>
      <LoadingBackdrop open={writeLoading} />
      <LectureFormDialog
        open={writeDialog.open === "write"}
        dialogTitle="강의 추가"
        desc="제목과 이미지를 넣어야 정상적인 등록이 가능합니다."
        lectureDialog={writeDialog}
        handleClose={handleClose}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  );
}

export default React.memo(LectureWriteDialogContainer);
