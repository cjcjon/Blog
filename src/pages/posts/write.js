import React from "react";
import { useRouter } from "next/router";
import PostLayout from "@components/layout/PostLayout";
import QuillEditorContainer from "@components/posts/write/QuillEditorContainer";
import TagWriterContainer from "@components/posts/write/TagWriterContainer";
import WritePostButtonsContainer from "@components/posts/write/WritePostButtonsContainer";

function write() {
  const router = useRouter();

  return (
    <PostLayout>
      <QuillEditorContainer />
      <TagWriterContainer />
      <WritePostButtonsContainer lectureId={router.query.lectureId} />
    </PostLayout>
  );
}

export default write;
