import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  initializeWriteDialog,
  changeWriteDialogField,
  writeSeries,
} from "@redux/sagas/SeriesSaga";
import SeriesFormDialog from "./SeriesFormDialog";

function SeriesFormDialogContainer() {
  const [inputError, setInputError] = useState(null);
  const dispatch = useDispatch();
  const {
    open,
    title,
    thumbnailFile,
    previewURL,
    error,
    nextLink,
  } = useSelector(({ series }) => ({
    open: series.writeDialog.open,
    title: series.writeDialog.title,
    thumbnailFile: series.writeDialog.thumbnailFile,
    previewURL: series.writeDialog.previewURL,
    error: series.writeDialog.error,
    nextLink: series.nextLink,
  }));

  useEffect(() => {
    if (nextLink.href !== "") {
      console.log("next Link changed");
      console.log(nextLink);

      // TODO: 전송받은 링크로 이동
    }

    return () => {
      // unmount 될 때 초기화
      dispatch(initializeWriteDialog());
    };
  }, [dispatch, nextLink]);

  const handleOpen = useCallback(() => {
    dispatch(changeWriteDialogField({ key: "open", value: true }));
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(changeWriteDialogField({ key: "open", value: false }));
  }, [dispatch]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeWriteDialogField({ key: name, value }));
    },
    [dispatch],
  );

  const handleFileChange = useCallback(
    (e) => {
      e.preventDefault();
      const reader = new FileReader();
      const uploadedFile = e.target.files[0];
      dispatch(
        changeWriteDialogField({ key: "thumbnailFile", value: uploadedFile }),
      );

      // preview용 설정
      reader.onloadend = () => {
        dispatch(
          changeWriteDialogField({ key: "previewURL", value: reader.result }),
        );
      };

      reader.readAsDataURL(uploadedFile);
    },
    [dispatch],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (title === "") {
        setInputError("제목을 입력하세요");
        return;
      }

      if (thumbnailFile === null) {
        setInputError("썸네일 이미지를 등록하세요");
        return;
      }

      // 폼 데이터 생성
      const formData = new FormData();
      formData.append("title", title);
      formData.append("thumbnailFile", thumbnailFile);

      // 전송
      dispatch(writeSeries(formData));
    },
    [dispatch, title, thumbnailFile],
  );

  return (
    <div style={{ marginBottom: "8px" }}>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        시리즈 추가
      </Button>
      <SeriesFormDialog
        open={open}
        title={title}
        thumbnailFile={thumbnailFile}
        previewURL={previewURL}
        handleClose={handleClose}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        onSubmit={onSubmit}
        inputError={inputError}
        error={error}
      />
    </div>
  );
}

export default React.memo(SeriesFormDialogContainer);
