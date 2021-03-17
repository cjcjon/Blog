import React from "react";
import Box from "@material-ui/core/Box";
import ColumnPost from "@components/main/ColumnPost";
import { useColumnBoxStyles } from "@styles/columnBox.style";

function RecommandPostList({ recommandPosts }) {
  const columnBoxStyle = useColumnBoxStyles();

  return (
    <div>
      {recommandPosts &&
        recommandPosts.map((data) => (
          <Box className={columnBoxStyle.column} key={data.id}>
            <ColumnPost
              href={`/posts/${data.id}`}
              title={data.title}
              subText={data.makeDate}
            />
          </Box>
        ))}
    </div>
  );
}

export default React.memo(RecommandPostList);
