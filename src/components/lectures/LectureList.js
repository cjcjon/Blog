import React from "react";
import Grid from "@material-ui/core/Grid";
import LectureCard from "./LectureCard";

function LectureList({ hasAuth, lectureList, onDeleteClick, onModifyClick }) {
  return (
    <Grid container spacing={3} direction="row" alignItems="stretch">
      {lectureList &&
        lectureList.map((data) => (
          // eslint-disable-next-line react/jsx-indent
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={data.id}>
            <LectureCard
              href={`/lectures/${data.id}/posts`}
              lectureData={data}
              hasAuth={hasAuth}
              onDeleteClick={onDeleteClick}
              onModifyClick={onModifyClick}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default React.memo(LectureList);
