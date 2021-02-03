import React from "react";
import Grid from "@material-ui/core/Grid";
import RecentPostCard from "./RecentPostCard";

function RecentPost() {
  const sampleText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={4}
    >
      <Grid item xs={12} sm={6}>
        <RecentPostCard
          href="/"
          imageUrl="sample"
          title="sample1"
          desc={sampleText}
          date="2021-01-21"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RecentPostCard
          href="/"
          imageUrl="sample"
          title="sample1"
          desc={sampleText}
          date="2021-01-21"
        />
      </Grid>
    </Grid>
  );
}

export default React.memo(RecentPost);
