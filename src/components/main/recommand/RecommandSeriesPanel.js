import React from "react";
import Box from "@material-ui/core/Box";
import ColumnPost from "@components/main/ColumnPost";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import RecommandSeriesTitle from "./RecommandSeriesTitle";

function RecommandSeriesPanel() {
  const columnBoxStyle = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyle.fullBox}>
      <RecommandSeriesTitle />
      <Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="첫 번째 시리즈의 첫 번째 포스트입니다"
            subText="20-12-07"
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="첫 번째 시리즈의 첫 번째 포스트입니다"
            subText="20-12-07"
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="첫 번째 시리즈의 첫 번째 포스트입니다"
            subText="20-12-07"
          />
        </Box>
        <Box className={columnBoxStyle.column}>
          <ColumnPost
            href="/"
            title="첫 번째 시리즈의 첫 번째 포스트입니다"
            subText="20-12-07"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(RecommandSeriesPanel);
