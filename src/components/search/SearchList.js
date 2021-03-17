import React from "react";
import SearchItem from "./SearchItem";

function SearchList({ postList }) {
  return (
    <>
      {postList &&
        postList.map((data, idx) => (
          <SearchItem
            key={data.id}
            post={data}
            href={`/posts/${data.id}`}
            last={postList.length - 1 === idx}
          />
        ))}
    </>
  );
}

export default React.memo(SearchList);
