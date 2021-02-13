import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  initializeSeriesDialog,
  changeSeriesDialogField,
  writeSeries,
  WRITE_SERIES,
} from "@redux/sagas/SeriesSaga";
import LoadingBackdrop from "@components/commons/LoadingBackdrop";
import SeriesFormDialog from "./SeriesFormDialog";

function SeriesWriteDialogContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { writeDialog, nextLink, error } = useSelector(({ series }) => ({
    writeDialog: series.seriesDialog,
    nextLink: series.nextLink,
    error: series.error,
  }));
  const writeLoading = useSelector(({ loading }) => loading[WRITE_SERIES]);

  useEffect(() => {
    if (nextLink.href !== "") {
      console.log("next Link changed");
      console.log(nextLink);

      // TODO: 전송받은 링크로 이동
      router.reload();
    }
  }, [dispatch, nextLink]);

  // Dialog 열기
  const handleOpen = useCallback(() => {
    dispatch(initializeSeriesDialog());
    dispatch(changeSeriesDialogField({ key: "open", value: "write" }));
  }, [dispatch]);

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

      if (writeDialog.title === "") {
        dispatch(
          changeSeriesDialogField({
            key: "inputError",
            value: "제목을 입력하세요",
          }),
        );
        return;
      }

      if (writeDialog.thumbnailFile === null) {
        dispatch(
          changeSeriesDialogField({
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
      dispatch(writeSeries(formData));
    },
    [dispatch, writeDialog.title, writeDialog.thumbnailFile],
  );

  return (
    <div style={{ marginBottom: "8px" }}>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        시리즈 추가
      </Button>
      <LoadingBackdrop open={writeLoading} />
      <SeriesFormDialog
        open={writeDialog.open === "write"}
        dialogTitle="Manage Series"
        desc="제목과 이미지를 넣어야 정상적인 등록이 가능합니다."
        seriesDialog={writeDialog}
        handleClose={handleClose}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  );
}

export default React.memo(SeriesWriteDialogContainer);
