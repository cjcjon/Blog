import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { useColumnBoxStyles } from "@styles/columnBox.style";
import RecommandLectureTitle from "./RecommandLectureTitle";
import RecommandLectureList from "./RecommandLectureList";

function RecommandLecturesContainer() {
  const recommandLectures = useSelector(({ main }) => main.recommandLectures);
  const columnBoxStyle = useColumnBoxStyles();

  return (
    <Box className={columnBoxStyle.fullBox}>
      <RecommandLectureTitle title="추천 강의" subTitle="Recommand" />
      <RecommandLectureList recommandLectures={recommandLectures} />
    </Box>
  );
}

export default React.memo(RecommandLecturesContainer);
