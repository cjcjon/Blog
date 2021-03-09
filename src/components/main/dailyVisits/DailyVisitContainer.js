import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import DailyVisitTitle from "./DailyVisitTitle";
import DailyVisitGraph from "./DailyVisitGraph";

function DailyVisitContainer() {
  const dayCount = useSelector(({ main }) => main.dayCount);
  const columnBoxStyles = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyles.fullBox}>
      <DailyVisitTitle title="일일 방문자" />
      <DailyVisitGraph data={dayCount} />
    </Box>
  );
}

export default React.memo(DailyVisitContainer);
