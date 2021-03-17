import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField } from "@redux/sagas/WritePostSaga";
import QuillEditor from "./QuillEditor";

function QuillEditorContainer({ originalPost }) {
  const dispatch = useDispatch();
  const { title } = useSelector(({ writePost }) => writePost.title);

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  return (
    <QuillEditor
      title={title}
      body={originalPost}
      onChangeField={onChangeField}
    />
  );
}

export default QuillEditorContainer;
