import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import HistoryIcon from "@material-ui/icons/History";
import Skeleton from "@material-ui/lab/Skeleton";
import LinkWrapper from "@components/links/LinkWrapper";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    transition: ".3s",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
  cardMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    width: "100%",
    padding: "10px 12px",
    paddingBottom: "0",
  },
  cardBottom: {
    width: "100%",
    padding: "4px 12px",
  },
  updated: {
    color: theme.palette.success.main,
  },
}));

function SeriesCard({ loading, href, title, number, date, recent }) {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <>
      {loading ? (
        <Card className={classes.root} elevation={2}>
          <Skeleton
            variant="rect"
            width="100%"
            animation="wave"
            className={classes.cardMedia}
          />
          <div className={classes.cardContent}>
            <Skeleton width="100%" animation="wave">
              <Typography variant="body2">.</Typography>
            </Skeleton>
            <Skeleton width="100%" animation="wave">
              <Typography gutterBottom variant="h6">
                .
              </Typography>
            </Skeleton>
          </div>
          <Divider />
          <Grid container className={classes.cardBottom}>
            <Grid item xs>
              <Skeleton width="100%" animation="wave">
                <Typography variant="body2">.</Typography>
              </Skeleton>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <LinkWrapper href={href}>
          <Card className={classes.root} elevation={2}>
            <CardMedia
              image="https://source.unsplash.com/random"
              alt="we don't have image"
              className={classes.cardMedia}
            />
            <div className={classes.cardContent}>
              <Typography variant="body2" color="textSecondary">
                {number}개의 포스트
              </Typography>
              <Typography gutterBottom variant="h6" className={wordStyles.bold}>
                {title}
              </Typography>
            </div>
            <Divider />
            <Grid container className={classes.cardBottom}>
              <Grid item xs>
                <Typography variant="body2" color="textSecondary">
                  {date}
                </Typography>
              </Grid>
              {recent && (
                <Grid
                  container
                  item
                  xs
                  alignItems="center"
                  wrap="wrap"
                  justify="flex-end"
                  className={classes.updated}
                >
                  Updated&nbsp;
                  <HistoryIcon />
                </Grid>
              )}
            </Grid>
          </Card>
        </LinkWrapper>
      )}
    </>
  );
}

export default React.memo(SeriesCard);
