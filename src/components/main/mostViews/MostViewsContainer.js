import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import MostViewTitle from "./MostViewTitle";
import MostViewList from "./MostViewList";

function MostViewsContainer() {
  const mostViews = useSelector(({ main }) => main.mostViewPosts);
  const columnBoxStyles = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyles.fullBox}>
      <MostViewTitle title="Hot" />
      <MostViewList mostViews={mostViews} />
    </Box>
  );
}

export default React.memo(MostViewsContainer);
