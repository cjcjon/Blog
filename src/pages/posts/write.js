import React from "react";
import { useRouter } from "next/router";
import QuillEditorContainer from "@components/posts/QuillEditorContainer";
import TagWriterContainer from "@components/posts/TagWriterContainer";
import WritePostButtonsContainer from "@components/posts/WritePostButtonsContainer";

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
