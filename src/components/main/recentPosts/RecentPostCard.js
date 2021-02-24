import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinkWrapper from "@components/links/LinkWrapper";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "180px",
    margin: "0",
    transition: "all 0.5s",
    msTransition: "all 0.5s",
    MozTransition: "all 0.5s",
    WebkitTransition: "all 0.5s",
    boxShadow: "8px 12px 18px rgba(34, 35, 58, 0.2)",
    [theme.breakpoints.up("sm")]: {
      "&:hover": {
        transform: "translateY(3px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  details: {
    position: "relative",
    flex: "1 0 64%",
    flexDirection: "column",
    minWidth: "0",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingTop: "0",
    paddingBottom: "12px !important",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  dateText: {
    fontSize: "0.8rem",
  },
  titleText: {
    marginTop: "-4px",
    marginBottom: theme.spacing(1),
  },
  descText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    whiteSpace: "normal",
    wordWrap: "break-word",
    height: "100%",
  },
  mediaContent: {
    position: "relative",
    flex: "1 0 36%",
    backgroundColor: theme.palette.background.paper,
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
}));

function RecentPostCard({ href, imageUrl, title, body, date }) {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  // TODO: Grid로 바꾸면 Responsive하게 할 수 있음. 단, 36%, 64% 같은 상세한 길이 표시 불가

  return (
    <LinkWrapper href={href}>
      <Card className={classes.root}>
        {imageUrl && (
          <div className={classes.mediaContent}>
            <CardMedia image={imageUrl} className={classes.mediaImage} />
          </div>
        )}
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="overline" className={classes.dateText}>
              {date}
            </Typography>
            <div className={classes.titleText}>
              <Typography variant="h6" className={wordStyles.dottedLine}>
                {title}
              </Typography>
            </div>
            <Typography variant="body2" className={classes.descText}>
              {body}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </LinkWrapper>
  );
}

export default React.memo(RecentPostCard);
