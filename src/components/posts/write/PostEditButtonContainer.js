import React from "react";
import { useSelector } from "react-redux";
import LinkWrapper from "@components/links/LinkWrapper";
import PostEditButton from "./PostEditButton";

function PostEditButtonContainer() {
  const { lectureInfo } = useSelector(({ post }) => ({
    lectureInfo: post.lectureInfo,
  }));
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {lectureInfo && user && user.auth === 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
            marginTop: "-2rem",
          }}
        >
          <LinkWrapper href={`/posts/write?lectureId=${lectureInfo.id}`}>
            <PostEditButton />
          </LinkWrapper>
        </div>
      )}
    </>
  );
}

export default PostEditButtonContainer;
