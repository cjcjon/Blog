import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialize, changeField } from "@redux/sagas/WritePostSaga";
import QuillEditor from "./QuillEditor";

function QuillEditorContainer() {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ writePost }) => ({
    title: writePost.title,
    body: writePost.body,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  // unmount 될 때 초기화 호출
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <QuillEditor title={title} body={body} onChangeField={onChangeField} />
  );
}

export default React.memo(QuillEditorContainer);
