import React from "react";
import QuillEditorContainer from "@components/posts/QuillEditorContainer";
import TagWriterContainer from "@components/posts/TagWriterContainer";
import WritePostButtons from "@components/posts/WritePostButtons";

function write() {
  return (
    <div>
      <QuillEditorContainer />
      <TagWriterContainer />
      <WritePostButtons />
    </div>
  );
}

export default write;
