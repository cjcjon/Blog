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
  image: {
    width: "100%",
    height: 0,
    paddingTop: "56.25%", // 16:9
    [theme.breakpoints.up("sm")]: {
      minHeight: "136px",
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
  number: {
    fontStyle: "italic",
    marginRight: "0.25rem",
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: "1.325rem",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  text: {
    width: "100%",
    fontSize: "1rem",
  },
}));

function SeriesPostThumbnail({ post }) {
  const { series, href, imgUrl, number, title, text, date, tags } = post;
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <>
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12} className={classes.postMeta}>
          {date} , {series}
        </Grid>
        <Grid item xs={12} sm={3}>
          <LinkWrapper href={href}>
            <CardMedia
              image={imgUrl}
              alt={`${series} ${title}`}
              className={classes.image}
            />
          </LinkWrapper>
        </Grid>
        <Grid
          container
          item
          direction="column"
          xs={12}
          sm={9}
          spacing={1}
          className={classes.content}
        >
          <Grid item xs>
            <LinkWrapper href={href}>
              <div className={classes.title}>
                <span className={classes.number}>{number}.</span> {title}
              </div>
              <div className={clsx(classes.text, wordStyles.dottedLine)}>
                {text}
              </div>
            </LinkWrapper>
          </Grid>
          <Grid container item>
            {/* 스크롤을 위해서 TagList 사용하지 않고 직접 만듦 */}
            <TagList tags={tags} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(SeriesPostThumbnail);
