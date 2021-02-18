import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { WRITE, write } from "@redux/sagas/WritePostSaga";
import LoadingBackdrop from "@components/commons/LoadingBackdrop";
import WritePostButtons from "./WritePostButtons";

function WritePostButtonsContainer({ seriesId }) {
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

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("tags", JSON.stringify(tags));
    formData.append("seriesId", seriesId);

    dispatch(write(formData));
  }, [title, body, tags, seriesId]);

  const onCancel = useCallback(() => {
    router.back();
  }, []);

  useEffect(() => {
    if (writeLink) {
      if (writeLink) {
        router.push(writeLink.href);
      }
    }
  }, [router, writeLink]);

  return (
    <>
      <WritePostButtons onSubmit={onSubmit} onCancel={onCancel} error={error} />
      <LoadingBackdrop open={writeLoading} />
    </>
  );
}

export default WritePostButtonsContainer;
