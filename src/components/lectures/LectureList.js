import React from "react";
import Grid from "@material-ui/core/Grid";
import LectureCard from "./LectureCard";

function LectureList({ lectureList, loading, onDeleteClick, onModifyClick }) {
  return (
    <Grid container spacing={3} direction="row" alignItems="stretch">
      {loading &&
        [...Array(4)].map((_, idx) => (
          // eslint-disable-next-line react/jsx-indent, react/no-array-index-key
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
            <LectureCard loading />
          </Grid>
        ))}
      {!loading &&
        lectureList &&
        lectureList.map((data) => (
          // eslint-disable-next-line react/jsx-indent
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={data.id}>
            <LectureCard
              href={`/lectures/${data.id}/posts`}
              lectureData={data}
              onDeleteClick={onDeleteClick}
              onModifyClick={onModifyClick}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default React.memo(LectureList);
