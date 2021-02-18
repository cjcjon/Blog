import React from "react";
import Box from "@material-ui/core/Box";
import ColumnPost from "@components/main/ColumnPost";
import { useColumnBoxStyles } from "@styles/columnBox.style";

function RecommandSeriesList({ recommandSeries }) {
  const columnBoxStyle = useColumnBoxStyles();

  return (
    <div>
      {recommandSeries &&
        recommandSeries.map((data) => (
          <Box className={columnBoxStyle.column} key={data.id}>
            <ColumnPost
              href={`/series/${data.id}/posts`}
              title={data.title}
              subText={data.lastPostDate}
            />
          </Box>
        ))}
    </div>
  );
}

export default React.memo(RecommandSeriesList);
