import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import HistoryIcon from "@material-ui/icons/History";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import LinkWrapper from "@components/links/LinkWrapper";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    transition: "all 0.3s",
    msTransition: "all 0.3s",
    MozTransition: "all 0.3s",
    WebkitTransition: "all 0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
  cardMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardMediaButton: {
    position: "absolute",
    color: theme.palette.primary.main,
    top: "8px",
    right: "4px",
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

function LectureCard({
  loading,
  href,
  lectureData,
  onDeleteClick,
  onModifyClick,
}) {
  const classes = useStyles();
  const wordStyles = useWordStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = useCallback((event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback((event) => {
    event.preventDefault();
    setAnchorEl(null);
  }, []);

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
              image={lectureData.thumbnail}
              alt="we don't have image"
              className={classes.cardMedia}
            />
            <IconButton
              aria-label="lecture-card-menu"
              aria-controls="lectureMenu"
              aria-haspopup="true"
              className={classes.cardMediaButton}
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="lectureMenu"
              anchorEl={anchorEl}
              keepMounted
              PaperProps={{
                style: {
                  width: "96px",
                },
              }}
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem value={lectureData.id} onClick={onDeleteClick}>
                Delete
              </MenuItem>
              <MenuItem value={lectureData.id} onClick={onModifyClick}>
                Modify
              </MenuItem>
            </Menu>
            <div className={classes.cardContent}>
              <Typography variant="body2" color="textSecondary">
                {lectureData.postCount}개의 포스트
              </Typography>
              <Typography gutterBottom variant="h6" className={wordStyles.bold}>
                {lectureData.title}
              </Typography>
            </div>
            <Divider />
            <Grid container className={classes.cardBottom}>
              <Grid item xs>
                <Typography variant="body2" color="textSecondary">
                  {lectureData.makeDate}
                </Typography>
              </Grid>
              {lectureData.updated && (
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

export default React.memo(LectureCard);
