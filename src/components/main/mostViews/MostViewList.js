import React from "react";
import Box from "@material-ui/core/Box";
import ColumnPost from "@components/main/ColumnPost";
import { useColumnBoxStyles } from "@styles/columnBox.style";

function MostViewList({ mostViews }) {
  const columnBoxStyles = useColumnBoxStyles();

  return (
    <div>
      {mostViews &&
        mostViews.map((data) => (
          <Box className={columnBoxStyles.column} key={data.id}>
            <ColumnPost
              href={`/posts/${data.id}`}
              title={data.title}
              subText={`+${data.view}`}
              subIsDate={false}
            />
          </Box>
        ))}
    </div>
  );
}

export default React.memo(MostViewList);
