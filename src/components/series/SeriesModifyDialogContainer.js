import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSeriesDialogField,
  modifySeries,
  MODIFY_SERIES,
} from "@redux/sagas/SeriesSaga";
import LoadingBackdrop from "@components/commons/LoadingBackdrop";
import SeriesFormDialog from "./SeriesFormDialog";

function SeriesModifyDialogContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { modifyDialog, nextLink, error } = useSelector(({ series }) => ({
    modifyDialog: series.seriesDialog,
    nextLink: series.modifyLink,
    error: series.error,
  }));
  const modifyLoading = useSelector(({ loading }) => loading[MODIFY_SERIES]);

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

  // Dialog 끄기
  const handleClose = useCallback(() => {
    dispatch(changeSeriesDialogField({ key: "open", value: false }));
  }, [dispatch]);

  // Dialog 이름으로 값 변경
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeSeriesDialogField({ key: name, value }));
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
        changeSeriesDialogField({ key: "thumbnailFile", value: uploadedFile }),
      );

      // preview redux 저장
      reader.onloadend = () => {
        dispatch(
          changeSeriesDialogField({ key: "previewURL", value: reader.result }),
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

      if (
        (modifyDialog.title === null || modifyDialog.title === "") &&
        modifyDialog.thumbnailFile === null
      ) {
        dispatch(
          changeSeriesDialogField({
            key: "inputError",
            value: "제목과 썸네일 하나는 입력해야합니다",
          }),
        );
        return;
      }

      // 폼 데이터 생성
      const formData = new FormData();
      formData.append("id", modifyDialog.id);
      if (modifyDialog.title !== null && modifyDialog.title !== "") {
        formData.append("title", modifyDialog.title);
      }
      if (modifyDialog.thumbnailFile !== null) {
        formData.append("thumbnailFile", modifyDialog.thumbnailFile);
      }

      // 전송
      dispatch(modifySeries(formData));
    },
    [dispatch, modifyDialog.id, modifyDialog.title, modifyDialog.thumbnailFile],
  );

  return (
    <>
      <SeriesFormDialog
        update
        open={modifyDialog.open === "modify"}
        dialogTitle="Change Series"
        desc="변경하고 싶은 부분을 변경하세요"
        seriesDialog={modifyDialog}
        handleClose={handleClose}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        onSubmit={onSubmit}
        error={error}
      />
      <LoadingBackdrop open={modifyLoading} />
    </>
  );
}

export default React.memo(SeriesModifyDialogContainer);
