import React from "react";
import Box from "@material-ui/core/Box";
import ColumnPost from "@components/main/ColumnPost";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import RecommandPostTitle from "./RecommandPostTitle";

function RecommandPostPanel() {
  const columnBoxStyle = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyle.fullBox}>
      <RecommandPostTitle />
      <Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="추천많은 첫번째 포스트입니다"
            subText="20-12-07"
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="추천많은 첫번째 포스트입니다"
            subText="20-12-07"
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="추천많은 첫번째 포스트입니다"
            subText="20-12-07"
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="추천많은 첫번째 포스트입니다"
            subText="20-12-07"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(RecommandPostPanel);
