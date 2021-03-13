import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField } from "@redux/sagas/WritePostSaga";
import TagWriter from "./TagWriter";

function TagWriterContainer() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.writePost.tags);

  const onChangeTags = (nextTags) => {
    dispatch(changeField({ key: "tags", value: nextTags }));
  };

  return <TagWriter tags={tags} onChangeTags={onChangeTags} />;
}

export default TagWriterContainer;
