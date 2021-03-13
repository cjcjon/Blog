import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField } from "@redux/sagas/WritePostSaga";
import QuillEditor from "./QuillEditor";

function QuillEditorContainer({ modify }) {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ writePost }) => ({
    title: writePost.title,
    body: writePost.body,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  return (
    <>
      {!modify ? (
        <QuillEditor title={title} body={body} onChangeField={onChangeField} />
      ) : body ? (
        <QuillEditor title={title} body={body} onChangeField={onChangeField} />
      ) : null}
    </>
  );
}

export default QuillEditorContainer;
