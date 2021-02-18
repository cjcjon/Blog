import React from "react";
import { useRouter } from "next/router";
import QuillEditorContainer from "@components/posts/write/QuillEditorContainer";
import TagWriterContainer from "@components/posts/write/TagWriterContainer";
import WritePostButtonsContainer from "@components/posts/write/WritePostButtonsContainer";

function write() {
  const router = useRouter();

  return (
    <div>
      <QuillEditorContainer />
      <TagWriterContainer />
      <WritePostButtonsContainer seriesId={router.query.seriesId} />
    </div>
  );
}

export default write;
