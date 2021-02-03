import React from "react";
import Grid from "@material-ui/core/Grid";
import SeriesCard from "./SeriesCard";

function SeriesList() {
  return (
    <Grid container spacing={3} direction="row" alignItems="stretch">
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <SeriesCard
          href="/series/list?id=1"
          title="긴 시리즈"
          number={3}
          date="2020-12-21"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <SeriesCard
          href="/series/list?id=1"
          title="두 번째 시리즈"
          number={6}
          date="2021-01-15"
          recent
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <SeriesCard
          href="/series/list?id=1"
          title="두 번째 시리즈"
          number={6}
          date="2021-01-15"
          recent
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <SeriesCard
          href="/series/list?id=1"
          title="첫 번째 시리즈"
          number={3}
          date="2020-12-21"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <SeriesCard
          href="/series/list?id=1"
          title="두 번째 시리즈"
          number={6}
          date="2021-01-15"
          recent
        />
      </Grid>
    </Grid>
  );
}

export default React.memo(SeriesList);
