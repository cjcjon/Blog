import React from "react";
import Box from "@material-ui/core/Box";
import ColumnPost from "@components/main/ColumnPost";
import { useColumnBoxStyles } from "@styles/columnBox.style";

function RecommandLectureList({ recommandLectures }) {
  const columnBoxStyle = useColumnBoxStyles();

  return (
    <div>
      {recommandLectures &&
        recommandLectures.map((data) => (
          <Box className={columnBoxStyle.column} key={data.id}>
            <ColumnPost
              href={`/lectures/${data.id}/posts`}
              title={data.title}
              subText={data.lastPostDate}
            />
          </Box>
        ))}
    </div>
  );
}

export default React.memo(RecommandLectureList);
