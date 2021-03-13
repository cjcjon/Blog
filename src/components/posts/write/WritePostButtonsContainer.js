import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { WRITE, write, MODIFY, modify } from "@redux/sagas/WritePostSaga";
import LoadingBackdrop from "@components/commons/LoadingBackdrop";
import WritePostButtons from "./WritePostButtons";

function WritePostButtonsContainer({ lectureId, postId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { title, body, tags, writeLink, error } = useSelector(
    ({ writePost }) => ({
      title: writePost.title,
      body: writePost.body,
      tags: writePost.tags,
      writeLink: writePost.writeLink,
      error: writePost.error,
    }),
  );
  const writeLoading = useSelector(({ loading }) => loading[WRITE]);
  const modifyLoading = useSelector(({ loading }) => loading[MODIFY]);

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("tags", JSON.stringify(tags));

    if (postId) {
      formData.append("id", postId);
      dispatch(modify(formData));
    } else {
      formData.append("lectureId", lectureId);
      dispatch(write(formData));
    }
  }, [postId, title, body, tags, lectureId]);

  const onCancel = useCallback(() => {
    router.back();
  }, []);

  useEffect(() => {
    if (writeLink) {
      router.push(writeLink.href);
    }
  }, [router, writeLink]);

  return (
    <>
      <WritePostButtons onSubmit={onSubmit} onCancel={onCancel} error={error} />
      <LoadingBackdrop open={writeLoading || modifyLoading} />
    </>
  );
}

export default WritePostButtonsContainer;
