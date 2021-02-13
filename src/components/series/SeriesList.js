import React from "react";
import Grid from "@material-ui/core/Grid";
import SeriesCard from "./SeriesCard";

function SeriesList({ seriesList, loading, onDeleteClick, onModifyClick }) {
  return (
    <Grid container spacing={3} direction="row" alignItems="stretch">
      {loading &&
        [...Array(3)].map((_, idx) => (
          // eslint-disable-next-line react/jsx-indent, react/no-array-index-key
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
            <SeriesCard loading />
          </Grid>
        ))}
      {!loading &&
        seriesList &&
        seriesList.map((data) => (
          // eslint-disable-next-line react/jsx-indent
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={data.id}>
            <SeriesCard
              href={`/series/${data.id}/posts`}
              seriesData={data}
              onDeleteClick={onDeleteClick}
              onModifyClick={onModifyClick}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default React.memo(SeriesList);
