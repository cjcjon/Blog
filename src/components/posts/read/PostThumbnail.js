import React from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import LinkWrapper from "@components/links/LinkWrapper";
import TagList from "@components/tags/TagList";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    margin: "0",
  },
  thumbnail: {
    width: "100%",
    height: 0,
    paddingTop: "56.25%", // 16:9
    [theme.breakpoints.up("sm")]: {
      minHeight: "168px",
      paddingTop: "0",
    },
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "12px !important",
    },
  },
  postMeta: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: "1.325rem",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  number: {
    fontStyle: "italic",
    marginRight: "0.25rem",
    color: theme.palette.text.secondary,
  },
  text: {
    width: "100%",
    fontSize: "1rem",
  },
}));

function PostThumbnail({ lectureInfo, href, number, post }) {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid container item xs={12} className={classes.postMeta}>
        {post.makeDate}
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <LinkWrapper href={href}>
          <CardMedia
            image={lectureInfo.thumbnail}
            alt="No Thumbnail"
            className={classes.thumbnail}
          />
        </LinkWrapper>
      </Grid>
      <Grid
        container
        item
        direction="column"
        xs={12}
        sm={8}
        md={9}
        spacing={1}
        className={classes.content}
      >
        <Grid item xs>
          <LinkWrapper href={href}>
            <div className={clsx(classes.title, wordStyles.dottedLine)}>
              <span className={classes.number}>{number}.</span>&nbsp;
              {post.title}
            </div>
            <div className={clsx(classes.text, wordStyles.dottedLine)}>
              {post.body}
            </div>
            <div className={classes.postMeta} style={{ marginTop: "0.5rem" }}>
              <span style={{ margin: "0 0.375rem" }}>•</span>조회수: {post.view}
              회<span style={{ margin: "0 0.375rem" }}>•</span>좋아요:{" "}
              {post.likes}
            </div>
          </LinkWrapper>
        </Grid>
        <Grid item>
          <TagList tags={post.tags.map((data) => ({ tag: data }))} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default React.memo(PostThumbnail);
