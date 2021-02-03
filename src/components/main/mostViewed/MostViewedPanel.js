import React from "react";
import Box from "@material-ui/core/Box";
import ColumnPost from "@components/main/ColumnPost";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import MostViewedTitle from "./MostViewedTitle";

function MostViewedPanel() {
  const columnBoxStyles = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyles.fullBox}>
      <MostViewedTitle />
      <Box>
        <Box className={columnBoxStyles.column}>
          <ColumnPost
            href="/"
            title="첫 번째로 많이 본 포스트"
            subText="+106"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyles.column}>
          <ColumnPost
            href="/"
            title="두 번째로 많이 본 포스트"
            subText="+105"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyles.column}>
          <ColumnPost
            href="/"
            title="세 번째로 많이 본 포스트"
            subText="+104"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyles.column}>
          <ColumnPost
            href="/"
            title="네 번째로 많이 본 포스트"
            subText="+103"
            subIsDate={false}
          />
        </Box>
        <Box className={columnBoxStyles.column}>
          <ColumnPost
            href="/"
            title="다섯 번째로 많이 본 포스트"
            subText="+102"
            subIsDate={false}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(MostViewedPanel);
