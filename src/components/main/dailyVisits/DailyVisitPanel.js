import React from "react";
import Box from "@material-ui/core/Box";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import DailyVisitTitle from "./DailyVisitTitle";

function DailyVisitPanel() {
  const columnBoxStyles = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyles.fullBox}>
      <DailyVisitTitle />
    </Box>
  );
}

export default React.memo(DailyVisitPanel);
