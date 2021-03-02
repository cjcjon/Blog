import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stripHtml } from "string-strip-html";
import PostViewerTOC from "./PostViewerTOC";

function PostViewerTOCContainer() {
  const postBody = useSelector(({ post }) => post.postInfo?.body);

  const regExp = useRef(new RegExp(/(<h\d.*?>)(?:(.*?|\n*?))(?=<\/h\d>)/, "g"));
  const [navContents, setNavContents] = useState([]);
  const [idList, setIdList] = useState([]);

  useEffect(() => {
    if (!postBody) return;

    const contents = [];

    // h1, h2, h3 잘라서 생성
    let res = regExp.current.exec(postBody);
    while (res !== null) {
      const regData = res[0];
      const htmlTag = regData.substring(1, 3);
      const idRegData = regData.match(/id="(.+)"/);
      const content = stripHtml(regData).result;
      let canPush = true;

      // 태그속성
      let tag = "";
      if (htmlTag === "h1") {
        tag = "h1";
      } else if (htmlTag === "h2") {
        tag = "h2";
      } else if (htmlTag === "h3") {
        tag = "h3";
      } else {
        canPush = false;
      }

      // id 저장하기
      // 캡처값으로 아이디가 두 번째 배열의 요소로 들어가게 된다
      let id = null;
      if (idRegData) {
        [, id] = idRegData;
      } else {
        canPush = false;
      }

      // 값 다시 매칭
      res = regExp.current.exec(postBody);

      // 정상적인 값이 아닐경우 무시
      if (!canPush) {
        // eslint-disable-next-line no-continue
        continue;
      }

      // 데이터 저장
      contents.push({ tag, id, content });
    }

    // 컨텐츠 넣기
    setNavContents(contents);
    // activeId 배열 생성
    setIdList(contents.map((item) => item.id));
  }, [postBody]);

  return (
    <>
      {postBody && <PostViewerTOC navContents={navContents} idList={idList} />}
    </>
  );
}

export default React.memo(PostViewerTOCContainer);
