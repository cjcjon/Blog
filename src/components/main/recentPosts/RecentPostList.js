import React from "react";
import Grid from "@material-ui/core/Grid";
import RecentPostCard from "./RecentPostCard";

function RecentPostList({ posts }) {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={4}
    >
      {posts &&
        posts.map((data) => (
          <Grid item xs={12} sm={6} key={data.id}>
            <RecentPostCard
              href={`/posts/${data.id}`}
              imageUrl={data.thumbnail}
              title={data.title}
              body={data.body}
              date={data.makeDate}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default React.memo(RecentPostList);
