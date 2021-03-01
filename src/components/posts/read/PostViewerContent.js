import React from "react";
import clsx from "clsx";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import TagList from "@components/tags/TagList";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "2rem",
    marginBottom: "0.5rem",
  },
  bodyContent: {
    marginBottom: "1.5rem",
    padding: "0 !important",
  },
  likes: {
    marginTop: "18rem",
  },
  accordion: {
    marginBottom: "1.5rem",
  },
  iconText: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

function PostViewerContent({ postInfo, actionButtons, likes, accordion }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {actionButtons}
      <div className={clsx("ql-snow")}>
        <div
          className={clsx("ql-editor", classes.bodyContent)}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: postInfo.body }}
        />
      </div>
      <div className={classes.likes}>{likes}</div>
      <div className={classes.accordion}>{accordion}</div>
      <div>
        <div className={classes.iconText}>
          <LocalOfferIcon />
          <Typography variant="subtitle2" style={{ marginLeft: "0.375rem" }}>
            <b>태그목록</b>
          </Typography>
        </div>
        <TagList tags={postInfo.tags.map((data) => ({ tag: data }))} />
      </div>
    </div>
  );
}

export default React.memo(PostViewerContent);
