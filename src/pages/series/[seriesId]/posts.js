import React from "react";
import { useRouter } from "next/router";
import PostList from "@components/posts/PostList";

function posts() {
  const router = useRouter();
  const { seriesId } = router.query;

  return (
    <div>
      <p>SeriesId: {seriesId}</p>
      <PostList />
    </div>
  );
}

export default React.memo(posts);
