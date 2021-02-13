import React from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Banner from "@components/Banner";
import PostThumbnail from "./PostThumbnail";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      maxWidth: "896px",
      margin: "0 auto",
    },
  },
  listItem: {
    marginBottom: "4rem",
  },
}));

function PostList() {
  const sample = {
    series: "알고리즘",
    href: "/post/123",
    imgUrl: "https://via.placeholder.com/150",
    number: "1",
    title: "백준 166532번 나의 아이디는 어떻게 된 건가요?",
    text:
      "백준 166532번 나의 아이디는 어떻게 된 건가요? 조금 더 길게 될까요?백준 166532번 나의 아이디는 어떻게 된 건가요? 조금 더 길게 될까요?백준 166532번 나의 아이디는 어떻게 된 건가요? 조금 더 길게 될까요?",
    date: "2020-02-02",
    tags: [
      { text: "js" },
      { text: "c++" },
      { text: "html" },
      { text: "css" },
      { text: "c#" },
      { text: "react" },
      { text: "vue" },
    ],
  };
  const classes = useStyles();

  return (
    <>
      <Banner text="시리즈 이름" />

      <div className={classes.list}>
        <Divider style={{ marginBottom: "24px" }} />
        <div className={classes.listItem}>
          <PostThumbnail post={sample} />
        </div>
        <div className={classes.listItem}>
          <PostThumbnail post={sample} />
        </div>
        <div className={classes.listItem}>
          <PostThumbnail post={sample} />
        </div>
        <div className={classes.listItem}>
          <PostThumbnail post={sample} />
        </div>
        <div className={classes.listItem}>
          <PostThumbnail post={sample} />
        </div>
      </div>
    </>
  );
}

export default React.memo(PostList);
