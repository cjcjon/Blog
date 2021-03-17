import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import LinkWrapper from "@components/links/LinkWrapper";
import { useWordStyles } from "@styles/useful.styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  body: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    whiteSpace: "normal",
    wordWrap: "break-word",
  },
  meta: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
    marginTop: "0.5rem",
  },
  divider: {
    margin: "3rem 0",
  },
}));

function SearchItem({ post, href, last }) {
  const classes = useStyles();
  const wordStyles = useWordStyles();

  return (
    <div>
      <LinkWrapper href={href}>
        <div className={clsx(classes.title, wordStyles.dottedLine)}>
          {post.title}
        </div>
        <div className={classes.body}>{post.body}</div>
        <div className={classes.meta}>
          <span style={{ margin: "0 0.375rem" }}>•</span>조회수: {post.view}회
          <span style={{ margin: "0 0.375rem" }}>•</span>좋아요: {post.likes}
        </div>
      </LinkWrapper>
      {!last && <Divider className={classes.divider} />}
    </div>
  );
}

export default SearchItem;
