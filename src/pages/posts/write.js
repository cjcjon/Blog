import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import PostLayout from "@components/layout/PostLayout";
import QuillEditorContainer from "@components/posts/write/QuillEditorContainer";
import TagWriterContainer from "@components/posts/write/TagWriterContainer";
import WritePostButtonsContainer from "@components/posts/write/WritePostButtonsContainer";
import { initialize } from "@redux/sagas/WritePostSaga";

function write() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    return () => {
      // 나갈때 정보 전부 지우기
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <PostLayout>
      <QuillEditorContainer />
      <TagWriterContainer />
      <WritePostButtonsContainer lectureId={router.query.lectureId} />
    </PostLayout>
  );
}

export default write;
