import React from "react";
import { useSelector } from "react-redux";
import LinkWrapper from "@components/links/LinkWrapper";
import PostEditButton from "./PostEditButton";

function PostEditButtonContainer() {
  const { seriesInfo } = useSelector(({ post }) => ({
    seriesInfo: post.seriesInfo,
  }));

  return (
    <>
      {seriesInfo && (
        <LinkWrapper href={`/posts/write?seriesId=${seriesInfo.id}`}>
          <PostEditButton />
        </LinkWrapper>
      )}
    </>
  );
}

export default React.memo(PostEditButtonContainer);
