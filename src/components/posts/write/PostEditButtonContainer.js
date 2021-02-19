import React from "react";
import { useSelector } from "react-redux";
import LinkWrapper from "@components/links/LinkWrapper";
import PostEditButton from "./PostEditButton";

function PostEditButtonContainer() {
  const { lectureInfo } = useSelector(({ post }) => ({
    lectureInfo: post.lectureInfo,
  }));

  return (
    <>
      {lectureInfo && (
        <LinkWrapper href={`/posts/write?lectureId=${lectureInfo.id}`}>
          <PostEditButton />
        </LinkWrapper>
      )}
    </>
  );
}

export default React.memo(PostEditButtonContainer);
