import React from "react";
import clsx from "clsx";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import TagList from "@components/tags/TagList";
import PostViewerLikes from "./PostViewerLikes";
import PostViewerAccordion from "./PostViewerAccordion";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "2rem",
    marginBottom: "0.5rem",
  },
  bodyContent: {
    marginBottom: "1.5rem",
    padding: "0 !important",
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

function PostViewerContent({
  lectureInfo,
  postList,
  postInfo,
  likeErrorMsg,
  onClickLike,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={clsx("ql-snow")}>
        <div
          className={clsx("ql-editor", classes.bodyContent)}
          dangerouslySetInnerHTML={{ __html: postInfo.body }}
        />
      </div>
      <PostViewerLikes
        number={postInfo.likes}
        onClick={onClickLike}
        errorMsg={likeErrorMsg}
      />
      <div className={classes.accordion}>
        <PostViewerAccordion lectureInfo={lectureInfo} postList={postList} />
      </div>
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
